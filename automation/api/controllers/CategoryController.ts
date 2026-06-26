import { APIRequestContext } from '@playwright/test';

export class CategoryController {
  private request: APIRequestContext;
  private headers: Record<string, string>;

  constructor(request: APIRequestContext, headers: Record<string, string>) {
    this.request = request;
    this.headers = headers;
  }

  async create(name: string, description: string) {
    const payload = {
      name,
      description,
      parent: null,
      structural: false
    };

    return await this.request.post('/api/part/category/', {
      headers: this.headers,
      data: payload,
    });
  }

  async getDetails(id: number) {
    return await this.request.get(`/api/part/category/${id}/`, {
      headers: this.headers,
    });
  }

  async patch(id: number, description: string) {
    return await this.request.patch(`/api/part/category/${id}/`, {
      headers: this.headers,
      data: { description },
    });
  }

  async delete(id: number) {
    return await this.request.delete(`/api/part/category/${id}/`, {
      headers: this.headers,
    });
  }
}
