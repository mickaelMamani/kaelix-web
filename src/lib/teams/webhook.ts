interface TeamsMessage {
  subject: string;
  projectName?: string;
  message: string;
  senderName: string;
  senderEmail: string;
}

export async function sendToTeams(data: TeamsMessage) {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("TEAMS_WEBHOOK_URL is not configured");
  }

  const card = {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.4",
          body: [
            {
              type: "TextBlock",
              size: "Medium",
              weight: "Bolder",
              text: `Support: ${data.subject}`,
            },
            {
              type: "FactSet",
              facts: [
                { title: "De:", value: `${data.senderName} (${data.senderEmail})` },
                ...(data.projectName
                  ? [{ title: "Projet:", value: data.projectName }]
                  : []),
              ],
            },
            {
              type: "TextBlock",
              text: data.message,
              wrap: true,
            },
          ],
        },
      },
    ],
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });

  if (!response.ok) {
    throw new Error(`Teams webhook failed: ${response.statusText}`);
  }
}
