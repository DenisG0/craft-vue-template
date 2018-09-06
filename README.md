# craft-vue-template
Practice project with server setup using digital ocean, LEMP stack, Craft CMS, larvel mix wepback, vue, vuex and router.




  _________                                 _________ .__                   __   .__  .__          __   
 /   _____/ ______________  __ ___________  \_   ___ \|  |__   ____   ____ |  | _|  | |__| _______/  |_ 
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \ /    \  \/|  |  \_/ __ \_/ ___\|  |/ /  | |  |/  ___/\   __\
 /        \  ___/|  | \/\   /\  ___/|  | \/ \     \___|   Y  \  ___/\  \___|    <|  |_|  |\___ \  |  |  
/_______  /\___  >__|    \_/  \___  >__|     \______  /___|  /\___  >\___  >__|_ \____/__/____  > |__|  
        \/     \/                 \/                \/     \/     \/     \/     \/            \/        


----Droplet Setup Check-List


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
=============Create Your Droplet===========================================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet

  -Log into your Digital Ocean account and create a droplet using the button in the top right or center. 
  
  -Choose a size, so far most websites use the 4GB droplet. It can run on 2GB with craft but usually runs out of data especially with features like e-commerce. 
  
  -SSH keys is the preferred method of login so if you haven’t done so already, generate a SSH key and add the public part of the keys to the droplet. It will end in a .pub extension. 
  
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
=============Initial Server Set-up===========================================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04

  -Create a new project in phpstorm or your IDE of choice. You’ll find everything you need for the rest of this tutorial in the tools drop on top.
  
  -Configure your project to be a SFTP transfer protocol. Set the ip address according to the droplet and login as a root user with the SSH key you have inputted during droplet set up. You’ ll have a chance to add more SSH keys and users later on. Most config pages will look like this with variations of IP address. 
  
  -Double check your configurations are correct by going again to tools -> deployment -> browse remote files. 
  -From tools, Start SSH Session. It should open up your terminal to continue.
  
  -Doing most of your work as a root user is not ideal, because of the destructive power as user with all privileges you must create a new user to work off.
  
  -Create a new user, in this example ‘sammy’ is the interchangeable variable: ‘adduser sammy’.
  
  -This user can use root privileges with ‘sudo’ or we can add this user to the sudo group like so: ‘ usermod -aG sudo sammy’.
  -If you have need to add more SSH keys for other users you can do so now by going into file path /root/.ssh/authorized_keys and adding the public key there. If folder is not there you may need to create the directory. Make sure to restrict its permissions using ‘chmod 700 ~/.{foldername}’
  
  -In the same director, /root/ find the file called ‘.digitalocean_password’ and hang on to the root_mysql_pass, you’ll be needing this later on when setting up your SQL database. 
  
  -Next with SSH key for login you will need to disable password Authentication for improved security. In file path /etc/ssh/sshd_config, find or create these configs in the file. PubkeyAuthentication yes, ChallengeResponseAuthentication no, PasswordAuthentication no.
  
  -Then reload the SSH daemon. ‘systemctl reload sshd’
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
=============Install Ngnix Webserver
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04#step-5-%E2%80%94-avoiding-old-cipher-suites

  -First thing to do is ‘apt-get update’ to get updates for Ubuntu 16.04. Then ‘apt-get upgrade’ to apply updates. Finally ‘apt-get dist-upgrade’ to upgrade the distribution. 
  
  -Next install Ngnix: ‘apt-get install nginx’
  
  -Check that it is properly installed by typing: ‘nginx -v’.
  
  -Go to file path /etc/nginx/sites-available/digitalocean and replace block so that 404 request are directed to craft. 

  -The try files replace with ‘try_files $uri/index.html $uri $uri/ /index.php?$query_string’.
  
  -Then under ‘index index.php index.html index.htm’ add a line ‘charset utf-8’.
  
  -Test your nginx configs with ‘nginx -t’ and restart if it checks out with `systemctl restart nginx`.
  
  -Rest of the nginx configurations have not been attempted yet(?).
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
=============Install and Secure phpMyAdmin====================================================================================
///////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////// 
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-16-04

  -Install phpmyAdmin: ‘apt-get install phpmyadmin php-mbstring php-gettext’
  
  -The only thing we need to do is explicitly enable the PHP mcrypt and mbstring extensions, which we can do by typing: ‘phpenmod mcrypt’ and ‘phpenmod mbstring’. 
  
  -Restart your server: ‘service nginx restart’.  		
  
  -You should now be able visit the website hosting your database in : https://{IP ADDRESS}/phpmyadmin. This may not work until step F. 
  
  -You go log into the account as root with the password .digitalocean_password you had saved from before. 
  
  -Create a system link ‘ln -s /usr/share/phpmyadmin /var/www/html/pma’. usr/share/ is where the phpmyadmin file use to be located. By moving it to html directory we can now access it in the browser. Pma also to be more obscure. Now the website database should be at ‘https://{IP ADDRESS}/pma’.
  
  -Then you will create an empty database and a new mysql user for craft to access that database. Databases tab -> create database -> call it what ever the site should be.
  
  -Create a craft user account, From tab User Accounts. New --> Add user account 
  Username - keep it handy though, host name = localhost
  
  -Get a nice strong 16 character password and keep it handy too. Generate the password usually is easiest. The button is bottom right to create, easy to miss.
  
  -From the User accounts tab, edit privileges. 
  
  -Click the database sub-tab and check all privileges. 
  
  -You will need the database name, user name and password to point Craft to the empty database when installing craft later on. 
  
  -Be sure to add the Html/PMA/ file to gitignore. 
  
  
///////////////////////////
-------  Extras -----------
///////////////////////////

=============Node.js ========================================================================================================

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04		

  -Enter ‘	apt-get install nodejs’ into the terminal. 		
  
  -Then install npm the package manager: ‘apt-get install npm’.
  
  -Install ‘npm install -g  n’ and then 	‘n lts’.
  
  -Finally check that its the latest version with ‘node -v’.	

=============Composer =======================================================================================================

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-16-04

  -Install composer by typing ‘apt-get install curl php-cli php-mbstring git unzip’
  
  -Make sure you are in the root directory and retrieve the installer : ‘curl -sS https://getcomposer.org/installer -o composer-setup.php’
  
  -Next run a short script to verify the hash key matches the latest key found on the installer page : 
  https://composer.github.io/pubkeys.html'. Type: ‘php -r "if (hash_file('SHA384', 'composer-setup.php') === ‘CODE TO BE REPLACED') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
  
  -Install the composer globally: ‘php composer-setup.php --install-dir=/usr/local/bin --filename=composer'.	
  
  -Type ‘composer’ to make sure you get a output showing the it in fact is installed. 
  
=============Browser Caching ================================================================================================

https://www.digitalocean.com/community/tutorials/how-to-implement-browser-caching-with-nginx-s-header-module-on-ubuntu-16-04

  -Go to the file path: ‘/etc/nginx/sites-available/default’. Inside the configuration block,found at the top, add the red text
