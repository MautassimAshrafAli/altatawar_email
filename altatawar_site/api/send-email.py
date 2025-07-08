from http.server import BaseHTTPRequestHandler
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Set CORS headers
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Extract form data
            name = data.get('name', '')
            email = data.get('email', '')
            subject = data.get('subject', '')
            message = data.get('message', '')

            # Email configuration
            smtp_server = "smtp.office365.com"
            smtp_port = 587
            sender_email = "altatawar@altatawar.com"
            sender_password = "admin12345678ASHRAF@"
            recipient_email = "altatawar@altatawar.com"

            # Create email message
            msg = MIMEMultipart('alternative')
            msg['From'] = sender_email
            msg['To'] = recipient_email
            msg['Subject'] = f"رسالة جديدة من الموقع: {subject}"

            # Create HTML email content
            html_content = f"""
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 20px; text-align: center; }}
                    .content {{ background: #f8f9fa; padding: 20px; }}
                    .field {{ margin-bottom: 15px; }}
                    .label {{ font-weight: bold; color: #374151; }}
                    .value {{ color: #6b7280; margin-top: 5px; }}
                    .footer {{ background: #374151; color: white; padding: 15px; text-align: center; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>رسالة جديدة من موقع التطور التكنولوجي</h1>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">الاسم:</div>
                            <div class="value">{name}</div>
                        </div>
                        <div class="field">
                            <div class="label">البريد الإلكتروني:</div>
                            <div class="value">{email}</div>
                        </div>
                        <div class="field">
                            <div class="label">الموضوع:</div>
                            <div class="value">{subject}</div>
                        </div>
                        <div class="field">
                            <div class="label">الرسالة:</div>
                            <div class="value">{message}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>هذه الرسالة تم إرسالها من نموذج الاتصال في موقع التطور التكنولوجي</p>
                    </div>
                </div>
            </body>
            </html>
            """

            # Attach HTML content
            html_part = MIMEText(html_content, 'html', 'utf-8')
            msg.attach(html_part)

            # Send email
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.send_message(msg)

            # Send success response
            response = {
                'success': True,
                'message': 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
            }
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))

        except Exception as e:
            # Send error response
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                'success': False,
                'message': 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
                'error': str(e)
            }
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))

    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

