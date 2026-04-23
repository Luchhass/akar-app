import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const firstName = escapeHtml(formData.get("firstName") || "-");
    const lastName = escapeHtml(formData.get("lastName") || "-");
    const email = escapeHtml(formData.get("email") || "-");
    const phone = escapeHtml(formData.get("phone") || "-");
    const brand = escapeHtml(formData.get("brand") || "-");
    const model = escapeHtml(formData.get("model") || "-");
    const year = escapeHtml(formData.get("year") || "-");
    const title = escapeHtml(formData.get("title") || "-");
    const description = escapeHtml(formData.get("description") || "-").replace(
      /\n/g,
      "<br />"
    );

    const imageFile = formData.get("image");
    const hasImage = imageFile && typeof imageFile === "object" && imageFile.size > 0;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = [];

    if (hasImage) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      attachments.push({
        filename: imageFile.name || "talep-gorseli",
        content: buffer,
        contentType: imageFile.type || "application/octet-stream",
      });
    }

    const html = `
      <!DOCTYPE html>
      <html lang="tr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Yeni Parça Talebi</title>
        </head>
        <body style="margin:0; padding:0; background-color:#111111; font-family:Arial, Helvetica, sans-serif; color:#ffffff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; background-color:#111111;">
            <tr>
              <td style="padding:32px 16px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:0; max-width:760px; margin:0 auto; background-color:#1b1b1b; border:1px solid rgba(255,255,255,0.08); border-radius:22px; overflow:hidden;">

                  <tr>
                    <td style="padding:34px 32px 28px 32px; background-color:#0f0f0f;">
                      <div style="display:inline-block; background:#04388d; color:#ffffff; font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; padding:10px 14px; border-radius:999px;">
                        Yeni Talep Formu
                      </div>

                      <div style="font-size:34px; line-height:1.1; font-weight:700; letter-spacing:-0.03em; color:#ffffff; margin-top:18px;">
                        AkAr Yedek Parça
                        <span style="color:#04388d;"> İletişim Talebi</span>
                      </div>

                      <div style="margin-top:14px; max-width:560px; font-size:15px; line-height:1.8; color:rgba(255,255,255,0.62);">
                        Web sitenizdeki iletişim formu üzerinden yeni bir talep gönderildi.
                        Aşağıda kullanıcının ilettiği tüm detayları bulabilirsiniz.
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="height:1px; background:linear-gradient(90deg, rgba(255,255,255,0), #04388d, rgba(255,255,255,0)); font-size:0; line-height:0;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td style="padding:28px 24px 32px 24px; background-color:#222222;">

                      <div style="margin-bottom:18px;">
                        <div style="margin:0 0 14px 0; font-size:12px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:#04388d;">
                          İletişim Bilgileri
                        </div>

                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:0; background:#efefed; border-radius:20px;">
                          <tr>
                            <td style="padding:18px;">
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:14px;">
                                <tr>
                                  <td width="50%" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Ad
                                      </div>
                                      <div style="font-size:17px; line-height:1.35; font-weight:700; color:#232323;">
                                        ${firstName}
                                      </div>
                                    </div>
                                  </td>

                                  <td width="50%" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Soyad
                                      </div>
                                      <div style="font-size:17px; line-height:1.35; font-weight:700; color:#232323;">
                                        ${lastName}
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td width="50%" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        E-posta
                                      </div>
                                      <div style="font-size:17px; line-height:1.45; font-weight:700;">
                                        <a href="mailto:${email}" style="color:#04388d; text-decoration:none;">
                                          ${email}
                                        </a>
                                      </div>
                                    </div>
                                  </td>

                                  <td width="50%" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Telefon
                                      </div>
                                      <div style="font-size:17px; line-height:1.35; font-weight:700; color:#232323;">
                                        ${phone}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div style="margin-bottom:18px;">
                        <div style="margin:0 0 14px 0; font-size:12px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:#04388d;">
                          Talep Detayı
                        </div>

                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:0; background:#efefed; border-radius:20px;">
                          <tr>
                            <td style="padding:18px;">
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:14px;">
                                <tr>
                                  <td width="33.33%" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Araç Markası
                                      </div>
                                      <div style="font-size:16px; line-height:1.35; font-weight:700; color:#232323;">
                                        ${brand}
                                      </div>
                                    </div>
                                  </td>

                                  <td width="33.33%" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Araç Modeli
                                      </div>
                                      <div style="font-size:16px; line-height:1.35; font-weight:700; color:#232323;">
                                        ${model}
                                      </div>
                                    </div>
                                  </td>

                                  <td width="33.33%" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Araç Yılı
                                      </div>
                                      <div style="font-size:16px; line-height:1.35; font-weight:700; color:#232323;">
                                        ${year}
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td colspan="3" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Başlık
                                      </div>
                                      <div style="font-size:18px; line-height:1.4; font-weight:700; color:#232323;">
                                        ${title}
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td colspan="3" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:10px;">
                                        Açıklama
                                      </div>
                                      <div style="font-size:15px; line-height:1.9; color:#232323;">
                                        ${description}
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td colspan="3" style="vertical-align:top;">
                                    <div style="background:#f7f7f6; border:1px solid rgba(0,0,0,0.06); border-radius:14px; padding:16px 18px;">
                                      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(35,35,35,0.48); margin-bottom:8px;">
                                        Ek Görsel
                                      </div>
                                      <div style="font-size:15px; line-height:1.7; color:#232323;">
                                        ${hasImage ? "Talebe ait görsel e-posta eki olarak eklendi." : "Görsel eklenmedi."}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div style="padding-top:8px; text-align:center;">
                        <a
                          href="mailto:${email}"
                          style="display:inline-block; background:#04388d; color:#ffffff; text-decoration:none; padding:14px 22px; border-radius:999px; font-size:13px; font-weight:700; letter-spacing:0.04em;"
                        >
                          Gönderen Kişiye Yanıt Ver
                        </a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:20px 24px 24px 24px; background:#161616; border-top:1px solid rgba(255,255,255,0.06);">
                      <div style="text-align:center; font-size:12px; line-height:1.8; color:rgba(255,255,255,0.38);">
                        Bu mesaj AkAr Yedek Parça web sitesi iletişim formu üzerinden otomatik olarak gönderildi.
                      </div>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const text = `
Yeni Parça Talebi

Ad: ${formData.get("firstName") || "-"}
Soyad: ${formData.get("lastName") || "-"}
E-posta: ${formData.get("email") || "-"}
Telefon: ${formData.get("phone") || "-"}

Araç Markası: ${formData.get("brand") || "-"}
Araç Modeli: ${formData.get("model") || "-"}
Araç Yılı: ${formData.get("year") || "-"}
Başlık: ${formData.get("title") || "-"}

Açıklama:
${formData.get("description") || "-"}

Ek Görsel: ${hasImage ? "Var" : "Yok"}
    `.trim();

    await transporter.sendMail({
      from: `"AkAr Yedek Parça" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: formData.get("email") || process.env.EMAIL_USER,
      subject: `Yeni İletişim Formu - ${formData.get("title") || "Yeni Talep"}`,
      html,
      text,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Mesaj gönderildi",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Mesaj gönderilemedi",
      },
      { status: 500 }
    );
  }
}