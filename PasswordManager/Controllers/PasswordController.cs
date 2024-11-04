using Microsoft.AspNetCore.Mvc;
using PasswordManager.Data;
using PasswordManager.Models;

namespace PasswordManager.Controllers
{
    public class PasswordController : Controller
    {
        private readonly AppDBContext _appDbContext;

        public PasswordController(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

		[HttpGet]
		public IActionResult Create()
		{
			return View();
		}

	}
}
