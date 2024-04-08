using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Bookstore.Configurations;

public class AuthConfig {
    public const string ISSUER = "randomauthserver"; 
    public const string AUDIENCE = "randomauthclient.com"; 
    public const string KEY = "randomrandomradndomrandomrandom_randomsecret@123123!!!";   
    
    // public static SymmetricSecurityKey GetSymmetricSecurityKey() => 
    //     new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}