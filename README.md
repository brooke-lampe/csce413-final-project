# CSCE 413 Project

A reporting tool for property sale trends in Lincoln, NE, area for buyers and sellers.

## Installation
### Enable IIS on Windows 10
1. Type `Turn Windows features on` in the search bar in the bottom left and click on `Turn Windows features on or off`. 
2. Click on the Internet Information Services checkbox. By default it will install all you need to host a website. However you might want to check some other components that you might need as well. Once done, click OK and Close when it says “Windows completed the requested changes.”
3. Make sure you have the same checkboxes selected as shown in. [this image](https://asset.itnota.com/wp-content/uploads/IIS-Windows-Features.png).
4. Type `IIS` in the search bar and click on `Internet Information Services (IIS) Manager`.
5. Under `connections` on the left side of the IIS window, expand the menue until you select `Default Web Site` and from `Actions` submenue on the right side make sure that the server is running.
6. Open your Browser and navigate to [localhost](http://localhost).

### Install PHP on IIS
1. Download and install [Microsoft Web Platform Installer 3.0](https://www.microsoft.com/web/downloads/platform.aspx).
3. Restart IIS, and click on the Web Platform Installer icon.
4. At the top of the Web Platform Installer window, click Products.
5. Type `php 7.2` in the search box and install php 7.2 **for x86**. For some reason Phalcon did not work with x64 when I installed it.
6. Make sure you have successfully installed php 7.2 by typing `php -v` in Windows Command Prompt (CMD).

### Install Phalcon Framework
1. Download the phalcon DLL file that matches your php version from [this link](https://github.com/phalcon/cphalcon/releases/tag/v3.4.4). Mine was phalcon_x86_vc15_php7.2_3.4.4_nts.zip.
2. Place the DLL file in php/ext directory. The path should be something like this: C:\Program Files (x86)\PHP\v7.2\ext.
3. Edit your php.ini, append `extension=php_phalcon.dll` at the end, and restart your webserver to load the extension.
4. Open PHP MAnager from IIS window. Under PHP extentions, click on `Enable or disable an extention`, and make sure that php_phalcon is enabled.
5. Restart the server, and from PHP manager on IIS click on Check phpinfo(). You should see a Phalcon module in the output. 

### Project Installation
1. Clone the project in C:\ root directory or C:\inetpub directory.
2. Right click on the project folder and go to the `secuirity` tab. Group and Users list should match the Group and Users list of C:\inetpub\wwwroot directory. So add the missing users.
3. Open IIS. Under connection expand until you select `Sites`. Right click and select `Add Website`.
4. Enter Site name, set the physical path to the public folder in you project directory, and set host name for the server. Mine is `csce413.loc`.
5. Open hosts file in `C:\Windows\System32\drivers\etc` and add `127.0.0.1 csce413.loc` at the end of the file. 
6. Create a MySQL database with the name `csce413`.
7. Change the database password in app/config/config.php with your MySQL root user password. 
8. Restart the server and go to the link that you chose for your server. e.g `csce413.loc`.

`