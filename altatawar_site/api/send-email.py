from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Email configuration from environment variables
#app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.office365.com')
#app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
#app.config['MAIL_USE_TLS'] = True
#app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
#app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
#app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'altatawar@altatawar.com'
app.config['MAIL_PASSWORD'] = 'admin12345678ASHRAF@'
app.config['MAIL_DEFAULT_SENDER'] = 'altatawar@altatawar.com'

mail = Mail(app)

def handler(request):
    """Vercel serverless function handler"""
    if request.method == 'OPTIONS':
        # Handle CORS preflight
        return jsonify({'status': 'ok'}), 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    
    if request.method != 'POST':
        return jsonify({'error': 'Method not allowed'}), 405
    
    try:
        data = request.get_json()
        
        # Extract form data
        name = data.get('name', '')
        email = data.get('email', '')
        subject = data.get('subject', '')
        message = data.get('message', '')
        
        # Validate required fields
        if not all([name, email, subject, message]):
            return jsonify({
                'success': False,
                'message': 'جميع الحقول مطلوبة / All fields are required'
            }), 400
        
        # Create company notification email
        company_msg = Message(
            subject=f"رسالة جديدة من الموقع: {subject}",
            sender='altatawar@altatawar.com',
            recipients=['altatawar@altatawar.com']
        )
        
        # Company email content (HTML)
        company_msg.html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #2c3e50; margin: 0;">التطور التكنولوجي</h2>
                <p style="color: #7f8c8d; margin: 5px 0;">رسالة جديدة من موقع الشركة</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #2c3e50; margin-top: 0;">تفاصيل الرسالة:</h3>
                <p><strong>الاسم:</strong> {name}</p>
                <p><strong>البريد الإلكتروني:</strong> {email}</p>
                <p><strong>الموضوع:</strong> {subject}</p>
                <p><strong>الرسالة:</strong></p>
                <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db;">
                    {message}
                </div>
            </div>
            
            <div style="text-align: center; color: #7f8c8d; font-size: 12px; margin-top: 30px;">
                <p>تم إرسال هذه الرسالة من موقع التطور التكنولوجي</p>
                <p>للرد على العميل، استخدم البريد الإلكتروني: {email}</p>
            </div>
        </div>
        """
        
        # Create customer confirmation email
        customer_msg = Message(
            subject="شكراً لتواصلكم معنا - التطور التكنولوجي",
            sender='altatawar@altatawar.com',
            recipients=[email]  
        )
        
        # Customer email content (HTML)
        customer_msg.html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #2c3e50; margin: 0;">التطور التكنولوجي</h2>
                <p style="color: #7f8c8d; margin: 5px 0;">IT Services & Solutions</p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #27ae60; margin-top: 0;">شكراً لتواصلكم معنا!</h3>
                <p>عزيزي/عزيزتي {name},</p>
                <p>تم استلام رسالتكم بنجاح وسنتواصل معكم في أقرب وقت ممكن.</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-top: 0;">ملخص رسالتكم:</h4>
                <p><strong>الموضوع:</strong> {subject}</p>
                <p><strong>الرسالة:</strong> {message}</p>
            </div>
            
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #1976d2; margin-top: 0;">معلومات التواصل:</h4>
                <p><strong>الهاتف:</strong> 0590409111 | 0547247562</p>
                <p><strong>البريد الإلكتروني:</strong> altatawar@altatawar.com</p>
                <p><strong>العنوان:</strong> صندوق بريد 229 - سكاكا - المملكة العربية السعودية</p>
            </div>
            
            <div style="text-align: center; color: #7f8c8d; font-size: 12px; margin-top: 30px;">
                <p>شكراً لثقتكم في خدماتنا التقنية المتميزة</p>
                <p>Thank you for trusting our distinguished technical services</p>
            </div>
        </div>
        """
        
        # Send emails
        mail.send(company_msg)
        logger.info(f"Company notification email sent for: {name} ({email})")
        
        mail.send(customer_msg)
        logger.info(f"Customer confirmation email sent to: {email}")
        
        return jsonify({
            'success': True,
            'message': 'تم إرسال الرسالة بنجاح! سنتواصل معكم قريباً / Message sent successfully! We will contact you soon.'
        }), 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        
    except Exception as e:
        logger.error(f"Email sending failed: {str(e)}")
        return jsonify({
            'success': False,
            'message': str(e),
            'error': str(e)
        }), 500, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

# Export for Vercel
def main(request):
    with app.app_context():
        return handler(request)

