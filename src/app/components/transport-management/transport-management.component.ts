import { Component, OnInit } from '@angular/core';
import { TransportService } from '@/app/services/transport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Transport {
  id: number;
  name: string;
}

@Component({
  selector: 'app-transport-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-management.component.html',
  styleUrls: ['./transport-management.component.css']
})
export class TransportManagementComponent implements OnInit {
  transports: Transport[] = [];
  newTransport = '';

  constructor(private transportService: TransportService) {}

  ngOnInit(): void {
    this.loadTransports();
  }

  loadTransports(): void {
    this.transportService.getAllTransports().subscribe(data => this.transports = data);
  }

  addTransport(): void {
    if (!this.newTransport.trim()) return;
    this.transportService.createTransport({ name: this.newTransport }).subscribe(() => {
      this.loadTransports();
      this.newTransport = '';
    });
  }
}
