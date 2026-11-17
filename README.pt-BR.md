# Mapa do Brasil (São Paulo) e interface em português

Este fork do [Lastbook](https://github.com/Immortal-Protocols/lastbook) acrescenta duas coisas:

1. **Interface em português do Brasil**, ao lado do inglês original.
2. **Mapa detalhado fora dos Estados Unidos**, com a região de **São Paulo** pronta: ruas, água,
   uso do solo, ferrovias, cidades e pontos de ajuda vindos do OpenStreetMap.

Nada aqui abre conexão: o mapa é um conjunto de arquivos SQLite que o aplicativo lê do disco, do
mesmo jeito que lê um mapa de estado dos EUA. As ferramentas de construção (que baixam dados
públicos) rodam só na máquina de quem constrói.

## Idioma

- A interface segue o idioma do sistema: `pt`/`pt-BR` abre em português; qualquer outro abre em inglês.
- Para trocar, use o botão de idioma no fim da barra lateral, ou no console do navegador:
  `localStorage.setItem('lb.lang','pt-BR')` (ou `'en'`) e recarregue.
- O dicionário fica em [`web/i18n.js`](web/i18n.js). O texto em inglês continua sendo a fonte: o
  português substitui rótulos conhecidos e deixa o resto em inglês, então nada quebra quando o
  projeto original muda.
- Também em português: distâncias em km, e não em milhas, no mapa.

O que **não** é traduzido: o conteúdo da biblioteca (manuais, vídeos, enciclopédias). Ele é escrito
por terceiros e continua no idioma original de cada obra.

## Mapa de São Paulo

### Construir

Fonte: GeoPackage público do Geofabrik (OpenStreetMap, ODbL 1.0). A região **Sudeste** cobre
SP, RJ, MG e ES; a ferramenta recorta a caixa de São Paulo.

```bash
# 1. Baixe (uma vez, ~2,3 GB)
curl -L -o sudeste-latest-free.gpkg.zip \
  https://download.geofabrik.de/south-america/brazil/sudeste-latest-free.gpkg.zip

# 2. Construa o conjunto de mapas (leva alguns minutos; precisa de ~10 GB livres)
python3 tools/build_region_map.py \
  --region BR-SP \
  --gpkg sudeste-latest-free.gpkg.zip \
  --out derived/packs/maps/BR-SP
```

Saída em `derived/packs/maps/BR-SP/`:

| Arquivo | O que tem |
|---|---|
| `derived/geo/national.sqlite` | ruas, água, uso do solo, ferrovias, cidades, pontos de ajuda e (opcional) prédios |
| `derived/geo/places.sqlite` | busca de cidades e lugares ("Encontrar um lugar") |
| `derived/geo/map.sqlite` | schema vazio (o motor sempre abre esse arquivo) |
| `map-set.json` | nome do conjunto e tamanho de cada arquivo |

Para um conjunto bem menor e mais rápido de construir, use `--skip-buildings`: os contornos de
prédios (visíveis só no zoom de rua) ficam de fora.

Não há relevo, prédios nem camadas de recursos minerais: essas bases só existem para os EUA e o
aplicativo simplesmente não mostra o que o conjunto não tem.

### Instalar numa pasta de dados do Lastbook

Feche o Lastbook antes (no Windows, arquivo aberto não é substituído).

```bash
python3 tools/install_map_set.py --data "C:/Users/voce/LastbookData" --set derived/packs/maps/BR-SP
```

O instalador guarda o conjunto anterior em `derived/geo/map-set-previous-<data>/` e copia o novo.
Abra o Lastbook, vá em **Mapa** e use o botão **Tudo** para enquadrar São Paulo.

Para outras regiões já registradas (`BR-RJ`, `BR-MG`, `BR-ES`), troque `--region`. A lista fica em
[`packaging/regions.py`](packaging/regions.py) — acrescentar uma região é acrescentar uma caixa
(`west, south, east, north`) e o extrato do Geofabrik de onde ela vem.

### Por que não aparece na tela de configuração

A configuração do Lastbook lista os mapas do `manifest-v1.json` publicado em
`downloads.lastbook.org`. Este conjunto é local, então ele é instalado pela ferramenta acima. Se
você publicar seus próprios arquivos e um manifesto, ele passa a aparecer na configuração como
qualquer mapa de estado.

## Rodar a partir do código

```bash
python3 -m venv .venv
.venv/Scripts/pip install -r packaging/requirements_app.txt      # Windows
.venv/Scripts/python app/main.py --data C:/caminho/LastbookData
```

O aplicativo original continua igual: `python3 app/main.py --data ...` (veja o README do projeto).

## Testes

```bash
python3 -B -m unittest app.tests.test_setup app.tests.test_validate_topics
python3 packaging/test_pack_tools.py
```

## Licença

O código e a documentação originais são MIT (veja [LICENSE](LICENSE)). Os dados do mapa são
© colaboradores do OpenStreetMap, sob ODbL 1.0 — o mesmo crédito que o mapa já mostra na tela.
