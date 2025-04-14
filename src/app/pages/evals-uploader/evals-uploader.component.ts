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

    try {
      this.isUploading = true;
      this.uploadProgress = 0;

      // 1. Crear evaluación
      const evalData = {
        school_name: this.evalName,
        grade: this.selectedGrade
      };

      console.log('Eval Data:', evalData);

      const response = await this.evalsService.createEval(evalData).toPromise();
      const evalId = response._id;
      console.log('Eval ID:', evalId);

      // 2. Subir imágenes una por una
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', this.selectedFiles[i].file);
        formData.append('evalID', evalId);

        await this.evalsService.uploadImage(formData).toPromise();
        this.uploadProgress = Math.round(((i + 1) / this.selectedFiles.length) * 100);
      }

      this.snackBar.open('Evaluación creada y archivos subidos exitosamente.', 'Cerrar', { duration: 3000 });

      //timeout para simular la subida de archivos 
      setTimeout(() => {

        this.resetForm();
        this.router.navigate(['']);
      }
      , 100);


    } catch (error) {
      console.error(error);
      this.snackBar.open('Error al subir archivos.', 'Cerrar', { duration: 3000 });
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
