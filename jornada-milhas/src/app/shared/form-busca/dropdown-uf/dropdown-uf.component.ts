import { UnidadeFederativa } from './../../../core/types/types';
import { UnidadeFederativaService } from './../../../core/services/unidade-federativa.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss']
})
export class DropdownUfComponent implements OnInit {
  @Input() label!: string;
  @Input() iconePrefixo!: string;
  @Input() control!: FormControl;

  public unidadeFederativas:UnidadeFederativa[] = []
  public filteredOptions$?: Observable<UnidadeFederativa[]>;

  constructor(private unidadeFederativaService:UnidadeFederativaService){}

  ngOnInit(): void {
    this.unidadeFederativaService.listarEstados().subscribe((response)=>{
      this.unidadeFederativas = response;
      console.log(this.unidadeFederativaService)
    })
    this.filteredOptions$ = this.control.valueChanges.pipe(startWith(''),map(value=> this.filtrarUfs(value)))
  }

  filtrarUfs(value: string): UnidadeFederativa[]{
    const valorFiltrado =value?.toLowerCase();
    const result = this.unidadeFederativas.filter(
      estado => estado.nome.toLowerCase().includes(valorFiltrado)
    )
    return result;
  }
  
}
