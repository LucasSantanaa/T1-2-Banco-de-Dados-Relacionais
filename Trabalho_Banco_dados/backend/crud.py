from sqlalchemy.orm import Session
from models import Produto
from schemas import ProdutoCreate, ProdutoUpdate

def get_produtos(db: Session):
    return db.query(Produto).all()

def get_produto(db: Session, produto_id: int):
    return db.query(Produto).filter(Produto.id == produto_id).first()

def create_produto(db: Session, produto: ProdutoCreate):
    db_produto = Produto(**produto.dict())
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto

def update_produto(db: Session, produto_id: int, produto: ProdutoUpdate):
    db_produto = db.query(Produto).filter(Produto.id == produto_id).first()
    if db_produto:
        for key, value in produto.dict().items():
            setattr(db_produto, key, value)
        db.commit()
        db.refresh(db_produto)
    return db_produto

def delete_produto(db: Session, produto_id: int):
    db_produto = db.query(Produto).filter(Produto.id == produto_id).first()
    if db_produto:
        db.delete(db_produto)
        db.commit()
    return db_produto
