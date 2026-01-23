from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.models.work import Work
import os

def seed_works(db:Session):
    if db.query(Work).count() > 0:
        print("works already seeded")
        return
    
    now = datetime.now(timezone.utc)

    works_data = [
        {
        "title":"おうちで参拝　リモートお参りアプリ",
        "description":(
            "LINE Bot 上で全国6社の神社へお参りし、"
            "お守り・おみくじの購入ができるアプリ。"
            "銀行APIを利用した決済フローを実装。"
        ),
        "tech_stack":"AWS Lambda/Node.js/LINE Official Account Manager/GMOあおぞらネット銀行 API（sunabar）",
        "github_url":"https://github.com/SAORI0216/sannpai-chatbot",
        "image_url":"https://placehold.co/600x400?text=Remote+Shrine",
        "is_published":True,
        "created_at":now,
        "updated_at": now,
        },
        {
        "title":"成分かんたん比較アプリ　しょくみる",
        "description":(
            "ユーザー投稿型で商品データを蓄積し、"
            "AI解析によりアレルギー・制限条件に応じた"
            "成分比較を可能にするアプリ"
        ),
        "tech_stack":"Next.js (App Router)/TypeScript/TailwindCSS/FastAPI/Python/SQLAlchemy/PostgreSQL/FirebaseAuthentication/FirebaseStorage/OpenAI/Stripe/Docker/Redis/Swagger/draw.io",
        "github_url":"https://github.com/SAORI0216/shokumiru",
        "image_url":"https://placehold.co/600x400?text=Food+App",
        "is_published":True,
        "created_at":now,
        "updated_at": now,
        },
        {
        "title":"ポートフォリオサイト",
        "description":(
            "自身の経歴・スキル・実績をまとめたポートフォリオサイト。"
            "バックエンド・フロントエンドともに自作。"
        ),
        "tech_stack":"Next.js (App Router)/TypeScript/TailwindCSS/FastAPI/Python/SQLAlchemy/PostgreSQL/FirebaseAuthentication/FirebaseStorage/Docker/Swagger/draw.io",
        "github_url":"https://github.com/SAORI0216/Portfolio",
        "image_url":"https://placehold.co/600x400?text=Portfolio",
        "is_published":True,
        "created_at":now,
        "updated_at": now,
        },
    ]

    for data in works_data:
        work = Work(**data)
        db.add(work)
    
    db.commit()
    print("works シーディング成功🌱")