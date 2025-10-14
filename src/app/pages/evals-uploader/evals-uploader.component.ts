import { Component, ViewChild, ElementRef } from '@angular/core';
import { GradesService } from 'src/app/services/grades.service';
import { EvalsService } from 'src/app/services/evals.service'; // <- asegúrate de tener este servicio
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evals-uploader',
  templateUrl: './evals-uploader.component.html',
  styleUrls: ['./evals-uploader.component.scss']
})
export class EvalsUploaderComponent {
  grades: any[] = [];
  evalName: any = '';
  selectedGrade: any = '';
  selectedFiles: { file: File; preview: any }[] = [];
  isUploading: boolean = false;
  uploadProgress: number = 0;
  isDragOver: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private gradesService: GradesService,
    private evalsService: EvalsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.gradesService.getGrades().subscribe((data: any) => {
      this.grades = data;
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      this.processFiles(event.target.files);
    }
  }

  processFiles(fileList: FileList) {
    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedFiles.push({ file, preview: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  async createEvalAndUpload() {
    if (!this.evalName || !this.selectedGrade || this.selectedFiles.length === 0) {
      this.snackBar.open('Completa todos los campos y selecciona imágenes.', 'Cerrar', { duration: 3000 });
      return;
    }
  
    this.isUploading = true;
    this.uploadProgress = 0;
  
    try {
      // 1. Crear evaluación
      const evalData = {
        school_name: this.evalName,
        grade: this.selectedGrade
      };
  
      const { _id: evalId } = await this.evalsService.createEval(evalData).toPromise();
      console.log('Evaluación creada con ID:', evalId);
  
      // 2. Subir todas las imágenes en secuencia
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', this.selectedFiles[i].file);
        formData.append('evalID', evalId);
  
        try {
          await this.evalsService.uploadImage(formData).toPromise();
          this.uploadProgress = Math.round(((i + 1) / this.selectedFiles.length) * 100);
        } catch (uploadError:any) {
          throw new Error(`Error al subir el archivo ${i + 1}: ${uploadError.message || uploadError}`);
        }
      }
  
      // 3. Procesar evaluación solo si todos los archivos fueron subidos
      this.snackBar.open('Archivos subidos exitosamente. Procesando evaluación...', 'Cerrar', { duration: 3000 });
  
      await this.evalsService.processEval(evalId).toPromise();
      this.snackBar.open('Evaluación enviada para procesamiento.', 'Cerrar', { duration: 3000 });
  
      // 4. Resetear formulario y redirigir
      this.resetForm();
      this.router.navigate(['']);
  
    } catch (error:any) {
      console.error('Error en el proceso de creación/subida/procesamiento:', error);
      this.snackBar.open(error.message || 'Error al crear la evaluación o subir archivos.', 'Cerrar', { duration: 3000 });
    } finally {
      this.isUploading = false;
    }
  }
  

  resetForm() {
    this.evalName = '';
    this.selectedGrade = '';
    this.selectedFiles = [];
    this.uploadProgress = 0;
  }
}
