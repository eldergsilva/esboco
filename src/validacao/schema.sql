create table usuarios(
  id serial primary key,
  nome text not null,
  email text unique not null,
  senha text not null) ;
  
  create table categorias (
   id serial primary key,
      descricao text not null);
       
INSERT INTO categorias (descricao)
VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');