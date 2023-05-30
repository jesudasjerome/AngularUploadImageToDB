import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from '../interface/file-handle';

@Component({
  selector: 'app-list-product-images',
  templateUrl: './list-product-images.component.html',
  styleUrls: ['./list-product-images.component.css']
})
export class ListProductImagesComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ){}


  ngOnInit(): void {
   this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }

}
