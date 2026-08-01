const eventTypeModel = require('../models/eventTypeModel');

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function create(req, res) {
  try {
    const { title, description, durationMinutes, color } = req.body;
    const slug = slugify(title);

    const eventType = await eventTypeModel.createEventType({
      userId: req.userId,
      title,
      slug,
      description,
      durationMinutes: durationMinutes || 30,
      color,
    });

    return res.status(201).json({ eventType });
  } catch (err) {
    if (err.code === '23505') { // unique_violation (slug duplicado pro user)
      return res.status(409).json({ error: 'Você já tem um tipo de evento com esse título' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar tipo de evento' });
  }
}

async function listMine(req, res) {
  const eventTypes = await eventTypeModel.listEventTypesByUser(req.userId);
  return res.json({ eventTypes });
}

async function getPublic(req, res) {
  const { username, slug } = req.params;
  const eventType = await eventTypeModel.findEventTypeBySlug(username, slug);

  if (!eventType) {
    return res.status(404).json({ error: 'Tipo de evento não encontrado' });
  }

  return res.json({ eventType });
}

async function remove(req, res) {
  const deleted = await eventTypeModel.deleteEventType(req.params.id, req.userId);
  if (!deleted) {
    return res.status(404).json({ error: 'Tipo de evento não encontrado' });
  }
  return res.status(204).send();
}

module.exports = { create, listMine, getPublic, remove };