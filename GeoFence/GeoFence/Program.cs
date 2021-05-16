using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GeoFence
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration(SetupConfiguration)
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseStartup<Startup>()
           // .UseHttpSys()            
            .ConfigureLogging(logBuilder =>
            {
                logBuilder.ClearProviders(); // removes all providers from LoggerFactory
                                             //  logBuilder.AddConsole();
                logBuilder.AddTraceSource("Information, ActivityTracing");
                logBuilder.AddDebug();
                logBuilder.AddEventSourceLogger();

            });

        private static void SetupConfiguration(WebHostBuilderContext ctx, IConfigurationBuilder builder)
        {

        }
    }
}
