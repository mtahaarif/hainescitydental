<#
Sample PowerShell script to open an SSH tunnel (Windows OpenSSH or PuTTY/plink).

Replace placeholders with your SSH host and user. This forwards local port 3307
to the remote MySQL host:port (127.0.0.1:3306 on the remote server) so you can
connect locally at localhost:3307.

OpenSSH example (preferred):

# ssh -L <local_port>:<remote_db_host>:<remote_db_port> user@ssh_host -N
# Example:
# ssh -L 3307:127.0.0.1:3306 user@ssh.example.com -N

PuTTY/plink example (if you have plink.exe):

# plink.exe -ssh user@ssh.example.com -L 3307:127.0.0.1:3306 -N -i C:\path\to\privatekey.ppk

Usage (PowerShell):

# Open an interactive tunnel
ssh -L 3307:127.0.0.1:3306 user@ssh.example.com

# Then in another shell connect with:
# mysql -h 127.0.0.1 -P 3307 -u DBUSER -p

Note: Close the SSH session to terminate the tunnel.
#>
Write-Host "This file contains sample SSH tunnel commands. Edit and run manually." -ForegroundColor Green
