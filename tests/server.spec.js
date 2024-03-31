const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo un 200", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });
  it("Obteniendo longitud del Array", async () => {
    const { body } = await request(server).get("/cafes").send();
    const dato = body;
    expect(dato).toBeInstanceOf(Array);
    expect(dato.length).toBeGreaterThanOrEqual(1);
  });
  it("Eliminando un dato no existente", async () => {
    const jwt = "token";
    const idCafesEliminar = 5;
    const response = await request(server)
      .delete(`/cafes/${idCafesEliminar}`)
      .set("Authorization", jwt)
      .send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });
  it("Verificando POST de cafes", async () => {
    const cafe = {
      id: 5,
      nombre: "Latte",
    };
    const response = await request(server).post("/cafes").send(cafe);
    const status = response.statusCode;
    expect(status).toBe(201);
  });
  it("Verificando Actualización de cafes", async () => {
    const idParam = 4;
    const cafeActualizado = {
      id: 3,
      nombre: "Descafeinado",
    };
    const response = await request(server)
      .put(`/cafes/${idParam}`)
      .send(cafeActualizado);
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});
