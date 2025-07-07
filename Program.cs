var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Allow React to talk with the C# backend (this file)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// DEFAULT API EXAMPLE
/*
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
*/

// Create a dummy list of appointment objects
List<Appointment> appointments = new List<Appointment>();

appointments.Add(new Appointment(
    Guid.NewGuid(), new DateOnly(2025, 7, 5), new TimeOnly(12, 30), "Mike", "Howser", "Genny", "Olive"
));
appointments.Add(new Appointment(
    Guid.NewGuid(), new DateOnly(2025, 7, 5), new TimeOnly(15, 45), "Julie", "Charms", "Bob", "McMan"
));
appointments.Add(new Appointment(
    Guid.NewGuid(), new DateOnly(2025, 7, 6), new TimeOnly(9, 00), "Mike", "Howser", "Lion", "Dream"
));

// GET route
app.MapGet("/appointments", () =>
{
    return appointments; // The ASP.NET Core framework automatically converts to JSON
})
.WithName("GetAppointments");

// POST route: add new appointment
app.MapPost("/appointments", (Appointment incoming) => 
{
    var newAppointment = incoming with { Id = Guid.NewGuid() }; // Creates a GUID for the given appointment details
    appointments.Add(newAppointment);
    return Results.Created($"/appointments/{newAppointment.Id}", newAppointment);
});

// DELETE route
app.MapDelete("/appointments/{id}", (Guid id) =>
{
    var appointment = appointments.FirstOrDefault(a => a.Id == id);
    if (appointment is null)
        return Results.NotFound();

    appointments.Remove(appointment);
    return Results.NoContent();
});

app.Run();

// Define what an Appointment is (MUST GO AT EOF)
record Appointment(
    Guid Id, // Globally Unique Identifier
    DateOnly Date,
    TimeOnly Time,
    string? DoctorFirst,
    string? DoctorLast,
    string? PatientFirst,
    string? PatientLast
);


