any changes in notificaionRequest table -> update utils middleware -> pnpm build -> npm login ->npm publish --access public

worker -> consumer (kafka consumer config)
       -> handler (routing request)
       -> provider (core logic)

npx prisma generate 
npx prisma migrate dev (current v2)

services/api/src ->  controller (producer to kafka, create user to notification DB)
                 -> pnpm build
                 -> pnpm run build


worker -> handler -> send mail,sms..etc. -> transitional outbox pattern (store in delivery db && produce it to kafka)

email ✅ - sent ✅
sms ✅ -  sent ✅
whatsapp ✅ - sent ✅
push notification 



steps to run : redis kafka docker run
               services/api -> pnpm run dev
               services/worker -> pnpm run dev
              services/analytics -> .\venv\Scripts\Activate.ps1c (help you to enter into venv of python project) ->
                                   celery -A celery_worker worker --loglevel=info --pool=solo
              services/analytics ->  python analytics_sever.py


TODO List :- push-token
             redis rate limitter
             outbox pattern(optional)
             well documentation
