import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на страхование собаки на почту Nikita_sviridov3110@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))

    plan_labels = {
        'trauma': 'Травмы — 6 000 ₽/год (до 50 000 ₽)',
        'trauma-acute': 'Травмы + острые болезни — 7 000 ₽/год (до 100 000 ₽)',
        'trauma-disease': 'Травмы + заболевания — 20 000 ₽/год (до 150 000 ₽)',
        'full': 'Всё включено со стационаром — 35 000 ₽/год (до 300 000 ₽)',
    }
    gender_labels = {'male': 'Кобель', 'female': 'Сука'}

    plan = plan_labels.get(body.get('plan', ''), body.get('plan', '—'))
    gender = gender_labels.get(body.get('dogGender', ''), body.get('dogGender', '—'))

    html = f"""
<html><body style="font-family: Arial, sans-serif; color: #1a120a; max-width: 600px;">
<h2 style="color: #e8601f; border-bottom: 2px solid #e8601f; padding-bottom: 8px;">🐾 Новая заявка на страхование</h2>

<h3 style="color: #5a3e2b;">Данные о питомце</h3>
<table style="width:100%; border-collapse: collapse;">
  <tr><td style="padding:6px 0; color:#777; width:45%">Кличка</td><td style="padding:6px 0; font-weight:bold">{body.get('dogName', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Пол</td><td style="padding:6px 0; font-weight:bold">{gender}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Возраст</td><td style="padding:6px 0; font-weight:bold">{body.get('dogAge', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Порода</td><td style="padding:6px 0; font-weight:bold">{body.get('dogBreed', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Окрас</td><td style="padding:6px 0; font-weight:bold">{body.get('dogColor', '—') or '—'}</td></tr>
  <tr><td style="padding:6px 0; color:#777">№ чипа / клейма</td><td style="padding:6px 0; font-weight:bold">{body.get('dogChip', '—') or '—'}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Тариф</td><td style="padding:6px 0; font-weight:bold; color:#e8601f">{plan}</td></tr>
</table>

<h3 style="color: #5a3e2b; margin-top: 24px;">Данные владельца</h3>
<table style="width:100%; border-collapse: collapse;">
  <tr><td style="padding:6px 0; color:#777; width:45%">ФИО</td><td style="padding:6px 0; font-weight:bold">{body.get('fio', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Адрес прописки</td><td style="padding:6px 0; font-weight:bold">{body.get('address', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Серия и номер паспорта</td><td style="padding:6px 0; font-weight:bold">{body.get('passportSeries', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Дата выдачи</td><td style="padding:6px 0; font-weight:bold">{body.get('passportDate', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Код подразделения</td><td style="padding:6px 0; font-weight:bold">{body.get('passportCode', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Кем выдан</td><td style="padding:6px 0; font-weight:bold">{body.get('passportIssuedBy', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Телефон</td><td style="padding:6px 0; font-weight:bold">{body.get('phone', '—')}</td></tr>
  <tr><td style="padding:6px 0; color:#777">Email</td><td style="padding:6px 0; font-weight:bold">{body.get('email', '—')}</td></tr>
</table>

<p style="margin-top:24px; color:#aaa; font-size:12px;">Заявка отправлена с сайта «У Нас Лапки»</p>
</body></html>
"""

    smtp_host = os.environ['SMTP_HOST']
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ['SMTP_USER']
    smtp_pass = os.environ['SMTP_PASS']
    to_email = 'Nikita_sviridov3110@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"🐾 Новая заявка: {body.get('dogName', '')} ({body.get('dogBreed', '')})"
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }