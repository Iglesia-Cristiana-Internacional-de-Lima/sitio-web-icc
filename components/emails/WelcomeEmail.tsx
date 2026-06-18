import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  nombre?: string | null;
}

export const WelcomeEmail = ({ nombre }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>¡Gracias por suscribirte!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡Bienvenido a la comunidad!</Heading>
          <Text style={text}>
            Hola {nombre ? nombre : 'amigo/a'},
          </Text>
          <Text style={text}>
            ¡Gracias por suscribirte a nuestra información! Nos alegra mucho tenerte con nosotros en la Iglesia Cristiana Internacional de Lima.
          </Text>
          <Text style={text}>
            A partir de ahora, recibirás notificaciones directamente en tu correo cada vez que organicemos eventos, charlas, retiros o reuniones especiales para que no te pierdas de nada.
          </Text>
          <Text style={footer}>
            Bendiciones,<br />El equipo de ICC Lima.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 48px',
  textAlign: 'center' as const,
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
};

const footer = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
  marginTop: '32px',
  fontWeight: 'bold',
};
