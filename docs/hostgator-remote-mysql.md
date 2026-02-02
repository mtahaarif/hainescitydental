HostGator — Allow Remote MySQL Access

1) Find your public IP

   - From the dev machine: `curl https://ifconfig.me`

2) Log in to cPanel

   - Open your HostGator cPanel for the account that hosts the database.
   - Search for “Remote MySQL” (usually under Databases).

3) Add the IP

   - In the Remote MySQL interface, add the public IP you fetched above to the "Access Hosts" list.
   - Optionally add `%.example.com` or `0.0.0.0/0` (not recommended) if you need broad access — prefer exact IP.

4) Wait and Test

   - Wait a minute for the change to apply.
   - Test from your machine using the `mysql` client or the Node test shown below.

Notes

- HostGator may block external connections by default; if you don't see Remote MySQL or it does not work,
  open a support ticket requesting remote MySQL access and include the DB host and your public IP.
- If HostGator provides an SSH gateway/hostname for the account, prefer an SSH tunnel (safer).
