using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiJujutsuKaisen.Models;

namespace ApiJujutsuKaisen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonajesController : ControllerBase
    {
        private readonly PersonajesContext _context;

        public PersonajesController(PersonajesContext context)
        {
            _context = context;
        }

        // GET: api/Personajes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personajes>>> GetPersonajes()
        {
          if (_context.Personajes == null)
          {
              return NotFound();
          }
            return await _context.Personajes.ToListAsync();
        }

        // GET: api/Personajes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personajes>> GetPersonajes(long id)
        {
          if (_context.Personajes == null)
          {
              return NotFound();
          }
            var personajes = await _context.Personajes.FindAsync(id);

            if (personajes == null)
            {
                return NotFound();
            }

            return personajes;
        }

        // PUT: api/Personajes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonajes(long id, Personajes personajes)
        {
            if (id != personajes.Id)
            {
                return BadRequest();
            }

            _context.Entry(personajes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonajesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Personajes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Personajes>> PostPersonajes(Personajes personajes)
        {
          if (_context.Personajes == null)
          {
              return Problem("Entity set 'PersonajesContext.Personajes'  is null.");
          }
            _context.Personajes.Add(personajes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonajes", new { id = personajes.Id }, personajes);
        }

        // DELETE: api/Personajes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonajes(long id)
        {
            if (_context.Personajes == null)
            {
                return NotFound();
            }
            var personajes = await _context.Personajes.FindAsync(id);
            if (personajes == null)
            {
                return NotFound();
            }

            _context.Personajes.Remove(personajes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonajesExists(long id)
        {
            return (_context.Personajes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
