import { APIRequestContext } from '@playwright/test';

export class PartController {
  private request: APIRequestContext;
  private headers: Record<string, string>;

  constructor(request: APIRequestContext, headers: Record<string, string>) {
    this.request = request;
    this.headers = headers;
  }

  async create(payload: Record<string, any>) {
    return await this.request.post('/api/part/', {
      headers: this.headers,
      data: payload,
    });
  }

  async getDetails(id: number) {
    return await this.request.get(`/api/part/${id}/`, {
      headers: this.headers,
    });
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.request.put(`/api/part/${id}/`, {
      headers: this.headers,
      data: payload,
    });
  }

  async delete(id: number) {
    return await this.request.delete(`/api/part/${id}/`, {
      headers: this.headers,
    });
  }

  async list(params: Record<string, any>) {
    return await this.request.get('/api/part/', {
      headers: this.headers,
      params,
    });
  }
}
