import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Emprestimo} from '../core/emprestimo/emprestimo';
import {EmprestimoService} from '../core/emprestimo/emprestimo.service';

@Component({
  selector: 'emprestimo-persist',
  templateUrl: './emprestimo-show.component.html'
})
export class EmprestimoShowComponent implements OnInit {

  emprestimo = new Emprestimo();

  constructor(private route: ActivatedRoute, private emprestimoService: EmprestimoService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.emprestimoService.get(+params['id']).subscribe((emprestimo: Emprestimo) => {
        this.emprestimo = emprestimo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.emprestimoService.destroy(this.emprestimo).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/emprestimo','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
