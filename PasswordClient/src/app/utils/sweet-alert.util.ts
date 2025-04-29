import Swal from 'sweetalert2';

// Función de confirmación
export function confirmDialog(
    title: string,
    text: string,
    confirmButtonText = 'Sí',
    cancelButtonText = 'Cancelar'
): Promise<boolean> {
    return Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
    }).then((result) => result.isConfirmed);
}

// Función para alerta
export function showToastAlert(
    title: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info',
    timer: number = 1500,
    position: 'center' | 'top' | 'top-end' | 'top-start' | 'bottom' | 'bottom-end' | 'bottom-start' = 'center'
): void {
    Swal.fire({
        position,
        icon,
        title,
        showConfirmButton: false,
        timer,
    });
}