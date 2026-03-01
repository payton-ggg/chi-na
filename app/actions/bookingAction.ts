"use server";

export async function sendBookingToTelegram(formData: {
  tour: string;
  date: string;
  people: string;
  email: string;
  telegram: string;
  message: string;
}) {
  const botToken = process.env.BOT_TOKEN;
  const userId = process.env.USER_ID;

  if (!botToken || !userId) {
    console.error("Telegram credentials missing in .env");
    return { success: false, error: "Server configuration error" };
  }

  const text = `
🆕 *Новая заявка на тур!*

🗺️ *Маршрут/Тур:* ${formData.tour || "Не выбран"}
📅 *Дата начала:* ${formData.date}
👥 *Количество человек:* ${formData.people}
📧 *Email:* ${formData.email}
✈️ *Telegram:* ${formData.telegram}

💬 *Сообщение:*
${formData.message || "Нет комментария"}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: userId,
          text: text,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      return { success: true };
    } else {
      console.error("Telegram API error:", data);
      return { success: false, error: data.description };
    }
  } catch (error) {
    console.error("Network error sending to Telegram:", error);
    return { success: false, error: "Network error" };
  }
}
