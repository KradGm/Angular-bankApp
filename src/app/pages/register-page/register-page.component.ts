import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { MyapiService } from 'src/app/services/myapi.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  formData: User = {
    name: '',
    account: {
      number: '',
      agency: '',
      balance: 0,
      limit: 0,
    },
    card: {
      number: '',
      limit: 0,
    },
    features: [
      {
        icon: '',
        description: '',
      },
    ],
    news: [
      {
        icon: '',
        description: '',
      },
    ],
  };

  constructor(private service: MyapiService) {}

  ngOnInit(): void {}

  submitForm() {
    // Crie uma cópia profunda dos dados do formulário para futureUser
    const futureUser: User = JSON.parse(JSON.stringify(this.formData));

    // Remova o campo 'id' do objeto (se necessário)
    delete futureUser.id;

    this.service.create(futureUser).subscribe({
      next: (res) => {
        // Manipular uma resposta bem-sucedida
        console.log('Solicitação bem-sucedida', res);
      },
      error: (error) => {
        // Manipular um erro
        console.error('Erro na solicitação', error);
        // Exibir uma mensagem de erro para o usuário
      }
    });
    console.log(futureUser)
  }
}
