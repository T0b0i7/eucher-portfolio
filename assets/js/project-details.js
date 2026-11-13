var projectDetails = {
  relay: {
    name: 'Relay',
    summary: 'Des agents fiables, testés et rejouables.',
    description: ['Relay met l’accent sur des agents fiables, testés et rejouables.'],
    features: ['Agents fiables', 'Tests', 'Exécutions rejouables'],
    technologies: ['Next.js', 'Node.js', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    impact: []
  },
  atlas: {
    name: 'Atlas',
    summary: 'Une couche de données qui réduit la latence de 64%.',
    description: [
      'Atlas est une couche de données intelligente qui réduit la latence de 64% et permet aux applications d’accéder aux données plus rapidement.',
      'Conçu pour la performance, Atlas optimise les échanges de données avec une architecture moderne.'
    ],
    features: ['Réduction de 64% de la latence', 'Accès aux données en temps réel', 'Haute disponibilité et scalabilité', 'Intégration simple'],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    impact: [{ value: '64%', label: 'Latence réduite' }]
  },
  ledger: {
    name: 'Ledger',
    summary: 'Démarre en 300ms, même hors ligne.',
    description: ['Ledger démarre en 300ms et reste utilisable même hors ligne.'],
    features: ['Démarrage en 300ms', 'Fonctionnement hors ligne'],
    technologies: ['React Native', 'Supabase', 'PWA'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop',
    impact: [{ value: '300ms', label: 'Démarrage' }]
  },
  nexus: {
    name: 'Nexus',
    summary: 'Tableau de bord temps réel pour flottes IoT.',
    description: ['Nexus présente un tableau de bord en temps réel pour suivre des flottes IoT.'],
    features: ['Tableau de bord en temps réel', 'Suivi de flottes IoT'],
    technologies: ['Vue.js', 'GraphQL', 'AWS'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    impact: []
  },
  pulse: {
    name: 'Pulse',
    summary: 'App de suivi médical avec analyse prédictive par IA.',
    description: ['Pulse associe le suivi médical à l’analyse prédictive par IA.'],
    features: ['Suivi médical', 'Analyse prédictive par IA'],
    technologies: ['Flutter', 'Firebase', 'HealthKit'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop',
    impact: []
  },
  orbit: {
    name: 'Orbit',
    summary: 'Moteur de recommandation pour l’e-commerce.',
    description: ['Orbit est un moteur de recommandation destiné à l’e-commerce.'],
    features: ['Recommandations pour l’e-commerce'],
    technologies: ['Python', 'TensorFlow', 'Docker'],
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2672&auto=format&fit=crop',
    impact: []
  }
};

function createSvg(path) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  var shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  shape.setAttribute('d', path);
  svg.appendChild(shape);
  return svg;
}

function initials(label) {
  return label.split(/[\s.]+/).filter(Boolean).map(function(part) {
    return part.charAt(0);
  }).join('').slice(0, 2).toUpperCase();
}

function renderProject(project) {
  document.title = project.name + ' — Détails du projet | Eucher ABATTI';
  document.getElementById('projectTitle').textContent = project.name;
  document.getElementById('projectSummary').textContent = project.summary;

  var cover = document.getElementById('projectCover');
  cover.src = project.image;
  cover.alt = 'Illustration du projet ' + project.name;
  document.getElementById('projectPreview').src = project.image;
  document.getElementById('projectPreview').alt = 'Aperçu visuel du projet ' + project.name;

  var tags = document.getElementById('projectTags');
  project.technologies.forEach(function(technology) {
    var tag = document.createElement('span');
    tag.className = 'project-tag';
    tag.textContent = technology;
    tags.appendChild(tag);
  });

  var description = document.getElementById('projectDescription');
  project.description.forEach(function(paragraph) {
    var p = document.createElement('p');
    p.textContent = paragraph;
    description.appendChild(p);
  });

  var features = document.getElementById('projectFeatures');
  project.features.forEach(function(feature) {
    var item = document.createElement('li');
    item.appendChild(createSvg('M20 6 9 17l-5-5'));
    item.appendChild(document.createTextNode(feature));
    features.appendChild(item);
  });

  var technologies = document.getElementById('projectTechnologies');
  project.technologies.forEach(function(technology) {
    var item = document.createElement('li');
    var icon = document.createElement('span');
    icon.className = 'tech-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = initials(technology);
    var label = document.createElement('span');
    label.className = 'tech-name';
    label.textContent = technology;
    item.className = 'tech-item';
    item.appendChild(icon);
    item.appendChild(label);
    technologies.appendChild(item);
  });

  var impactSection = document.getElementById('impactSection');
  if (!project.impact.length) {
    impactSection.hidden = true;
    document.getElementById('featuredImpact').hidden = true;
    return;
  }

  var impact = document.getElementById('projectImpact');
  project.impact.forEach(function(result) {
    var item = document.createElement('div');
    item.className = 'impact-item';
    var value = document.createElement('span');
    value.className = 'impact-value';
    value.textContent = result.value;
    var label = document.createElement('span');
    label.className = 'impact-label';
    label.textContent = result.label;
    item.appendChild(value);
    item.appendChild(label);
    impact.appendChild(item);
  });

  var featured = project.impact[0];
  document.getElementById('featuredValue').textContent = featured.value;
  document.getElementById('featuredLabel').textContent = featured.label;
  document.getElementById('featuredImpact').hidden = false;
}

var projectId = new URLSearchParams(window.location.search).get('project');
var selectedProject = Object.prototype.hasOwnProperty.call(projectDetails, projectId) ? projectDetails[projectId] : null;

if (selectedProject) {
  renderProject(selectedProject);
} else {
  document.getElementById('projectDetail').hidden = true;
  document.getElementById('projectNotFound').hidden = false;
  document.title = 'Projet introuvable — Eucher ABATTI';
}
