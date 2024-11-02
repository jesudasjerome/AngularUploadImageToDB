import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from '../product/interface/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<File[]> = new EventEmitter();

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    const droppedFiles: File[] = [];
    if (event.dataTransfer?.files) {
      // Extract the files directly from the drag-and-drop event
      Array.from(event.dataTransfer.files).forEach(file => {
        droppedFiles.push(file);
      });
    }

    // Emit the array of File objects directly
    this.files.emit(droppedFiles);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  // @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  // @HostBinding("style.background") private background = "#eee";

  // constructor(private sanatizer: DomSanitizer) { }

  // @HostListener("dragover", ["$event"])
  // public onDragOver(dragEvent: DragEvent){
  //   dragEvent.preventDefault();
  //   dragEvent.stopPropagation();
  //   this.background = "#999";
  // }

  // @HostListener("dragleave", ["$event"])
  // public onDragLeave(dragEvent: DragEvent){
  //   dragEvent.preventDefault();
  //   dragEvent.stopPropagation();
  //   this.background = "#eee";
  // }

  // @HostListener("drop", ["$event"])
  // public onDrop(dragEvent: DragEvent){
  //   dragEvent.preventDefault();
  //   dragEvent.stopPropagation();
  //   this.background = "#eee";

  //   let fileHandle: FileHandle;

  //   const file = dragEvent.dataTransfer!.files[0];

  //   const url = this.sanatizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

  //   fileHandle = {file ,url};

  //   this.files.emit(fileHandle);

  // }

}
