from app.db.session import SessionLocal
from app.scripts.seed_admins import seed_admins
from app.scripts.seed_profiles import seed_profiles
from app.scripts.seed_skills import seed_skills
from app.scripts.seed_works import seed_works

def run_all_seeds():
    db = SessionLocal()
    try:
        print("🌱 Seeding admins...")
        seed_admins(db)

        print("🌱 Seeding profiles...")
        seed_profiles(db)

        print("🌱 Seeding skills...")
        seed_skills(db)

        print("🌱 Seeding works...")
        seed_works(db)

        print("✅ All seeds completed successfully!")
    except Exception as e:
        db.rollback()
        print("❌ Seeding failed:", e)
        raise
    finally:
        db.close()

if __name__ == "__main__":
    run_all_seeds()