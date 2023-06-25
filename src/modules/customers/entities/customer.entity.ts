import { randomUUID } from 'crypto';

interface CustomerProps {
  id?: string;
  document: number;
  name: string;
}

export class Customer {
  id: string;
  document: number;
  name: string;
  createdAt: Date;

  constructor(props: CustomerProps) {
    const { id, document, name } = props;
    this.id = id ?? randomUUID();
    this.document = document;
    this.name = name;
    this.createdAt = new Date();
  }
}
