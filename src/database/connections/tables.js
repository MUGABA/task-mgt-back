const tasks = {
  create: `CREATE TABLE IF NOT EXISTS tasks (
          task_id serial NOT NULL,
          title varchar(255) NOT NULL,
          start_date timestamp NULL,
          end_date timestamp NULL,
          created_on timestamp NOT NULL DEFAULT now(),
          assign int4 NULL,
          supervisor int4 NULL,
          creator int4 NULL,
          status varchar NULL DEFAULT 0,
          CONSTRAINT tasks_pkey PRIMARY KEY (task_id),
          CONSTRAINT pk_assign FOREIGN KEY (assign) REFERENCES public.users(user_id),
          CONSTRAINT pk_creator FOREIGN KEY (creator) REFERENCES public.users(user_id),
          CONSTRAINT pk_supervisor FOREIGN KEY (supervisor) REFERENCES public.users(user_id)
        );`,
  delete: "DROP TABLE IF EXISTS tasks cascade;",
};

const comments = {
  create: `CREATE TABLE IF NOT EXISTS comments (
        comment_id serial NOT NULL,
        task int4 NULL,
        commenter int4 NULL,
        "comment" text NULL,
        created_on timestamp NULL DEFAULT now(),
        CONSTRAINT comments_pkey PRIMARY KEY (comment_id),
        CONSTRAINT pk_commenter FOREIGN KEY (commenter) REFERENCES public.users(user_id),
        CONSTRAINT pk_task FOREIGN KEY (task) REFERENCES public.tasks(task_id) ON DELETE CASCADE
);;`,
  delete: `DROP TABLE IF EXISTS comments cascade;`,
};

const users = {
  create: `CREATE TABLE IF NOT EXISTS users (
        user_id serial NOT NULL,
        email varchar(200) NOT NULL,
        username varchar(50) NOT NULL,
        user_password text NOT NULL,
        contact varchar(15) NOT NULL,
        created_on timestamp NOT NULL DEFAULT now(),
        user_role int4 NULL,
        CONSTRAINT users_email_key UNIQUE (email),
        CONSTRAINT users_pkey PRIMARY KEY (user_id),
        CONSTRAINT fk_role FOREIGN KEY (user_role) REFERENCES public.roles(role_id)
      );`,
  delete: "DROP TABLE IF EXISTS users cascade;",
  insert: `INSERT INTO users (email,username, user_password,contact,user_role)
          VALUES('hello@gmail.com','hello',
          '$2b$10$x4/dZE7aPXgraALW.5Qq..tTL0Xh1g3134T.rizeIZt6vHusS0nD.',
          '7983749303',1);`,
};

const roles = {
  create: `CREATE TABLE IF NOT EXISTS roles (
        role_id serial NOT NULL,
        role varchar(50) NOT NULL,
        CONSTRAINT roles_pkey PRIMARY KEY (role_id)
      );`,
  delete: "DROP TABLE IF EXISTS roles cascade;",
  insert: `INSERT INTO roles (role) VALUES('admin');`,
};

const products = {
  create: `CREATE TABLE public.products (
        id bigserial NOT NULL,
        product_name varchar(255) NOT NULL,
        created_on timestamp NOT NULL DEFAULT now(),
        created_by int8 NULL,
        CONSTRAINT products_pkey PRIMARY KEY (id),
        CONSTRAINT created_user FOREIGN KEY (created_by) REFERENCES public.users(user_id)
      );`,
  delete: `DROP TABLE IF EXISTS projects cascade;`,
};

const issue = {
  create: `CREATE TABLE public.issues (
        id bigserial NOT NULL,
        title varchar(200) NOT NULL,
        description text NOT NULL,
        product_id int4 NOT NULL,
        created_by int4 NOT NULL,
        assigned_user int4 NOT NULL,
        rating int4 NOT NULL,
        created_on timestamp NOT NULL DEFAULT now(),
        closed_on timestamp NULL,
        closed_by int4 NULL,
        CONSTRAINT issues_pkey PRIMARY KEY (id),
        CONSTRAINT assign FOREIGN KEY (assigned_user) REFERENCES public.users(user_id),
        CONSTRAINT closser FOREIGN KEY (closed_by) REFERENCES public.users(user_id),
        CONSTRAINT creator FOREIGN KEY (created_by) REFERENCES public.users(user_id),
        CONSTRAINT product FOREIGN KEY (product_id) REFERENCES public.products(id)
      );`,
  delete: "DROP TABLE IF EXISTS issues cascade;",
};

export default {
  users,
  roles,
  comments,
  tasks,
};
