from enum import Enum

class SkillCategory(str,Enum):
    FRONTEND = "Frontend"
    BACKEND = "Backend"
    INFRA = "Infra/Cloud"
    EXTERNAL = "External API/Service"
    TOOLS = "Tools/Others"
    BAAS = "Auth/BaaS"