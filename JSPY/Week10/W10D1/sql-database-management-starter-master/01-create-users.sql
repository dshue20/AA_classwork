-- In this file, you will create some users for later exercises.

-- Create the following normal users with the indicated names and passwords
-- | name                   | password |
-- |------------------------|----------|
-- | aa_times               | 6g73WE2V |
-- | project_management_app | Q3HphPJ8 |

CREATE USER aa_times with PASSWORD '6g73WE2V';
CREATE USER project_management_app with PASSWORD 'Q3HphPJ8';


-- Create the following superuser with the indicated name and password
-- | name       | password |
-- |------------|----------|
-- | data_admin | ik2fiDri |

CREATE USER data_admin with PASSWORD 'ik2fiDri' SUPERUSER;
