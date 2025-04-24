from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas import Produto, ProdutoCreate, ProdutoUpdate
from crud import get_produtos, get_produto, create_produto, update_produto, delete_produto

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[Produto])
def listar_produtos(db: Session = Depends(get_db)):
    return get_produtos(db)

@router.get("/{produto_id}", response_model=Produto)
def buscar_produto(produto_id: int, db: Session = Depends(get_db)):
    db_produto = get_produto(db, produto_id)
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return db_produto

@router.post("/", response_model=Produto)
def criar_produto(produto: ProdutoCreate, db: Session = Depends(get_db)):
    return create_produto(db, produto)

@router.put("/{produto_id}", response_model=Produto)
def atualizar_produto(produto_id: int, produto: ProdutoUpdate, db: Session = Depends(get_db)):
    return update_produto(db, produto_id, produto)

@router.delete("/{produto_id}")
def excluir_produto(produto_id: int, db: Session = Depends(get_db)):
    return delete_produto(db, produto_id)
