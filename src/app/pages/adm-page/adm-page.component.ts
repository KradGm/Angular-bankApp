import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account, User } from 'src/app/models/User';
import { MyapiService } from 'src/app/services/myapi.service';

@Component({
  selector: 'app-amd-page',
  templateUrl: './adm-page.component.html',
  styleUrls: ['./adm-page.component.css']
})
export class AdmPageComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;
  recipientId!: number;
  id!: number;
  name!: string;
  accountValue!: number;
  account: Account;

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
    history: [
      {
        value:0,
        userName:'',
        transactionDate: new Date,
        description:'Criação da conta'
      }
    ]
  };

  constructor(private service: MyapiService) {
    this.account = {
      id: 0,
      number: "",
      agency: "",
      balance: 0,
      limit: 0
    };
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  selectUser(user: User) {
    this.selectedUser = user;
    if (user.id !== undefined)
      this.recipientId = user.id;
  }

  deleteUser(id: number){
    if (id !== undefined) {
      this.service.remove(id).subscribe({
        next: (res) => {
          console.log('Usuário excluído com sucesso', res);
          this.users = this.users.filter(user => user.id !== id);
          this.selectedUser = null; // Clear the selected user
        },
        error: (error) => {
          console.error('Erro na exclusão do usuário', error);
        }
      });
    }
  }
  submitForm() {
    // Crie uma cópia profunda dos dados do formulário para futureUser
    const futureUser: User = JSON.parse(JSON.stringify(this.formData));

    // Remover Id
    delete futureUser.id;

    this.service.create(futureUser).subscribe({
      next: (res) => {
        console.log('Solicitação bem-sucedida', res);
      },
      error: (error) => {
        console.error('Erro na solicitação', error);
      }
    });
    console.log(futureUser)
  }

}
