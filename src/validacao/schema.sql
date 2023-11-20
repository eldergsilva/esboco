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

create table produtos (
  id serial primary key,
  descricao text not null,
  quantidade_estoque int,
  valor decimal(10,2) not null,
  categoria_id int not null
);

ALTER TABLE produtos
ADD COLUMN produto_imagem VARCHAR(255);


create table clientes(
  id serial primary key,
  nome text not null,
  email text unique not null,
  cpf varchar(11) unique not null,
  cep varchar(8),
  rua text,
  numero text,
  bairro text,
  cidade text,
  estado text  
);

