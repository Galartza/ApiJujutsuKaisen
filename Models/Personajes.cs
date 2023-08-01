namespace ApiJujutsuKaisen.Models;

public class Personajes
{
    public long Id { get; set; }
    public string? Nombre { get; set; }
    public int Edad { get; set; }
    public string? Habilidades { get; set; }
    public string? Descripcion { get; set; }
    public string? RutaImagen { get; set; }
}
