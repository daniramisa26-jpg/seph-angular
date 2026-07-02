import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../core/auth/authService';
import { CatalogService } from '../../../core/services/catalogs/catalog.service';
import { StaffRegistrationService } from '../staff-registration.service';

import { CreateEmployeeRequest } from '../../../shared/models/staff-registration/requests/createEmployeeRequest';
import { SexResponse } from '../../../shared/models/catalogs/responses/sexResponse';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.scss'
})
export class PersonalInformationComponent implements OnInit {

  private staffRegistrationService = inject(StaffRegistrationService);
  private authService = inject(AuthService);
  private catalogService = inject(CatalogService);

  sexes: SexResponse[] = [];

  isSaving = false;

  notificationMessage = '';

  notificationType: 'success' | 'error' = 'success';

employee: CreateEmployeeRequest = {
  strNombre: '',
  strApellidoPat: '',
  strApellidoMat: '',
  strCurp: '',
  idSexo: 0,
  idInstitucion: 0,
  dateTimeFechaRegistro: new Date().toISOString(),
  idUsuarioRegistro: '',
  bitActivo: true,
  dateTimeFechaBaja: new Date().toISOString()
};

  ngOnInit(): void {
    this.loadSexes();
  }

  loadSexes(): void {
    this.catalogService
      .getSexes()
      .subscribe({
        next: (response) => {
          this.sexes = response.data ?? [];
        },
        error: (error) => {
          console.error('Error cargando sexos:', error);
        }
      });
  }
saveEmployee(
  onSuccess: (employeeId: number) => void,
  onFinish?: () => void
): void {
  if (this.isSaving) {
    return;
  }

  this.isSaving = true;
  this.notificationMessage = '';

  const finishSaving = (): void => {
    this.isSaving = false;
    onFinish?.();
  };

  const currentUser = this.authService.currentUser();

  if (!currentUser) {
    this.showNotification(
      'No se encontró información del usuario autenticado.',
      'error'
    );

    finishSaving();
    return;
  }

  if (!currentUser.idInstitucion) {
    this.showNotification(
      'El usuario no tiene una institución asignada.',
      'error'
    );

    finishSaving();
    return;
  }

  this.employee.idInstitucion = currentUser.idInstitucion;
  this.employee.idUsuarioRegistro = currentUser.id;
  this.employee.dateTimeFechaRegistro = new Date().toISOString();

  this.staffRegistrationService
    .createEmployee(this.employee)
    .subscribe({
      next: (response) => {
        if (response.statusCode !== 200) {
          this.showNotification(
            response.message ??
              'No fue posible guardar la información personal.',
            'error'
          );

          finishSaving();
          return;
        }

        const employeeId =
          typeof response.data === 'number'
            ? response.data
            : response.data?.id;

        if (!employeeId) {
          this.showNotification(
            'No se recibió el identificador del empleado.',
            'error'
          );

          finishSaving();
          return;
        }

        this.showNotification(
  'Información personal guardada correctamente.',
  'success'
);
console.log('Empleado guardado con ID:', employeeId);

finishSaving();
onSuccess(employeeId);

      },
      error: (error) => {
        const errorMessage = this.getSaveEmployeeErrorMessage(error);

        this.showNotification(
          errorMessage,
          'error'
        );

        finishSaving();
      }
    });
}

  private getSaveEmployeeErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    }

    if (error.status === 409) {
      return 'La CURP ya se encuentra registrada.';
    }

    if (error.status === 0) {
      return 'No fue posible conectar con el servidor.';
    }

    if (error.status === 500) {
      return 'Ocurrió un error inesperado al guardar la información.';
    }

    return 'No fue posible guardar la información personal.';
  }

  private showNotification(
    message: string,
    type: 'success' | 'error'
  ): void {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notificationMessage = '';
    }, 4000);
  }
}