using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using API_PROGIII.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

string MyCors = "MyCors";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("db_conex")));
builder.Services.AddCors(options => { options.AddPolicy(name: MyCors, builder => builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod()); });
// Add services to the container.
builder.Services.AddTransient<IPerson, PersonService>();
builder.Services.AddTransient<IProduct, ProductService>();
builder.Services.AddTransient<IUnit, UnitService>();
builder.Services.AddTransient<IType, TypeService>();
builder.Services.AddTransient<IAddress, AddressService>();
builder.Services.AddTransient<IGeoData, GeoService>();
builder.Services.AddTransient<IOperation, OperationService>();
builder.Services.AddTransient<ITicket, TicketService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("MyCors");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseAuthorization();

app.MapControllers();

app.Run();
