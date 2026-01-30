import redis

def check_redis_connection():
    try:
        # Connect to Redis (adjust host/port/password as needed)
        r = redis.Redis(
            host="127.0.0.1",
            port=6379,
            password=None,
            decode_responses=True
        )

        # Test the connection
        response = r.ping()
        if response:
            print("✅ Redis connection is OK")
        else:
            print("⚠️ Redis connection failed")
    except redis.ConnectionError as e:
        print(f"❌ Redis connection error: {e}")

if __name__ == "__main__":
    check_redis_connection()
