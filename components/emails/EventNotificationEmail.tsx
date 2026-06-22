import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EventNotificationEmailProps {
  titulo: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  responsable: string;
  url?: string;
}

export const EventNotificationEmail = ({
  titulo,
  descripcion,
  fecha,
  ubicacion,
  responsable,
  url,
}: EventNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nuevo Evento: {titulo}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡Tenemos un nuevo evento preparado para ti!</Heading>
          <Text style={text}>
            Hola, te compartimos los detalles de nuestro próximo evento en la Iglesia Cristiana Internacional de Lima.
          </Text>
          <Heading as="h2" style={h2}>{titulo}</Heading>
          <Text style={text}>{descripcion}</Text>
          <Text style={details}>
            <strong>🗓 Fecha:</strong> {fecha}
            <br />
            <strong>📍 Ubicación:</strong> {ubicacion}
            <br />
            <strong>👤 Responsable:</strong> {responsable}
          </Text>
          {url && (
            <Link href={url} style={button}>
              Ver más detalles
            </Link>
          )}
        </Container>
      </Body>
    </Html>
  );
};

export default EventNotificationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 48px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#2563eb', // blue-600
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '0 48px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 48px',
};

const details = {
  backgroundColor: '#f8fafc', // slate-50
  padding: '16px 48px',
  color: '#334155', // slate-700
  fontSize: '15px',
  lineHeight: '24px',
  margin: '24px 0',
  borderTop: '1px solid #e2e8f0',
  borderBottom: '1px solid #e2e8f0',
};

const button = {
  backgroundColor: '#2563eb', // blue-600
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '14px 7px',
  margin: '32px auto 0 auto',
};
