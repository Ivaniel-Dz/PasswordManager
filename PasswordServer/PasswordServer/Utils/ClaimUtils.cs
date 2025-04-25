using System.Security.Claims;

namespace PasswordServer.Utils
{
    public static class ClaimUtils
    {
        public static int? GetUserIdFromClaims(ClaimsPrincipal claims)
        {
            // Verfica si esta autenticado
            if (claims?.Identity?.IsAuthenticated != true)
                return null;

            var claim = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : null;
        }
    }
}
