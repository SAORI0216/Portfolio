from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.models.profile import Profile
import os

def seed_profiles(db:Session):
    if db.query(Profile).count() > 0:
        print("profiles already seeded")
        return
    
    profile = Profile(
        name="さおり",
        bio="営業、国家公務員としての社会人経験を経て、「人の努力や仕組みを技術で支える仕事がしたい」と思い、エンジニアを目指しました。2025年10月よりコーディングブートキャンプに参加し、チーム開発ではリーダーを担当。メンバーと協力しながら課題を整理し、最後までやり切る経験ができました。一児の母として限られた時間の中でも、毎日少しずつ学習を継続することを大切にしています。新しい技術を学び続けながら、チームに貢献できるエンジニアとして成長していきたいです。",
        profile_image_url="https://placehold.co/400x400?text=Profile",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )

    db.add(profile)
    db.commit()
    print("profiles シーディング成功🌱")