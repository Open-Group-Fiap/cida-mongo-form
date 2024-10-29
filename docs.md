## Problema
Em um mundo cada vez mais data-driven, as empresas estão se afogando em um mar de dados não estruturados. Essa abundância de dados, muitas vezes desorganizada e sem significado, esconde insights valiosos que podem impulsionar o crescimento e a competitividade das empresas. Muitas vezes a solução ideal seria contratar uma empresa de consultoria para analisar a situação interna da empresa com base nesses dados, porém isso também vem com seus próprios problemas, como custo elevado, resultado da mão de obra qualificada que deverá realizar o serviço, também temos a imprevisibilidade da análise humana, além do tempo que será gasto com a espera da finalização dessa analise, e a incapacidade de transformar esses dados brutos em insights acionáveis representa um obstáculo significativo para o sucesso das empresas, que pode resultar em perca de competitividade, ineficiência na sua gestão interna e a não tomada das melhores decisões para o futuro da empresa.

### Nossa Solução
Com base nisso visionamos uma solução que consiga facilitar esse processo, de uma forma rápida e previsível, que pudesse utilizar do poder das IAs generativas para resolver esse problema.

Então criamos a CIDA ou (Consulting Insights with Deep Analysis), a nossa IA de processamento de dados e geração de insights empresariais, a CIDA é dividida em dois momentos, no primeiro momento ela recebe toda e qualquer documentação interna da empresa, não precisando estar em uma estrutura fixa ou padronizada, e ela tem a capacidade de processar esses dados brutos e refinar eles para a sua forma mais pura, passando assim todos esses dados refinados para o seu segundo momento, nesse ponto a IA generativa entra em ação, analisando todos esses dados e assim gerando insights e aconselhando sobre possíveis melhorias a serem feitas internamente na empresa.

A CIDA com a sua incrível capacidade de transformação de dados brutos em insights acionáveis também traz algumas vantagens a alternativa humana, primeiramente temos o custo, que é muito menor simplesmente pelo fato de não haver mão de obra envolvida, os processamentos realizados são totalmente automáticos e não necessitam de supervisão, também temos a facilidade de uso, já que você pode só fazer upload de arquivos PDF ou planilhas do Excel que já estão prontos e a parte de processar esses dados fica conosco, também temos o tempo que é muito menor às alternativas humanas tendo em vista o processo realizado por uma máquina e também temos a previsibilidade da análise, tornando ela muito mais confiável do que uma possível análise humana.
### Publico Alvo
Nós observamos 2 públicos focais para a CIDA, PMEs ou empresas de pequeno e médio porte, que não necessariamente tem uma estrutura interna de documentação totalmente regrada e padronizada, ponto esse que deixaria uma consultoria humana mais cara, e também para essas empresas muitas vezes ter uma empresa de consultoria de alto nível vindo fazer a consultoria não seria possível pelo custo elevado desses serviços, outro grande possível publico seriam startups que tem em sua natureza se movimentar e mudar rapidamente, oque também impossibilitaria uma análise aprofundada vinda de uma empresa de consultoria que deverá analisar seus processos e documentações internas, fatores esses muitas vezes indefinidos nesses momentos iniciais da vida de uma empresa.
Outros possíveis públicos são: Empreendedores, departamentos individuais dentro de empresas e empresas de consultoria usando a CIDA como uma assistente na sua análise.
### Produtos Semelhantes
Atualmente os únicos produtos similares ao nosso no mercado são ferramentas de BI como:
- **Board:** [https://www.board.com/](https://www.board.com/)
- **ThoughtSpot:** [https://www.thoughtspot.com/](https://www.thoughtspot.com/)

Porém, ambas as ferramentas têm 3 diferenças essenciais, sendo:
- Ambas exigem a entrada manual de dados
- Ambas não conseguem realizar processamento de dados brutos como conseguimos
- Ambas exigem que a empresa realize uma parceria com a plataforma de BI, por exigir todo um processo de transição e analise para esses sistemas, fator esse que não existe com a CIDA

Vale também ressaltar que ambas essas plataformas têm o foco delas em BI e administração, enquanto isso, nós temos o nosso foco apenas em fornecer uma consultoria daquele momento da empresa.

### Potencial de Mercado
Pensando nos nossos públicos alvos de PMEs e startups, atualmente 99% das empresas abertas no Brasil se classificam como PME, no ano de 2021 tinham 20.798.291 empresas abertas no Brasil, 99% disso seriam aproximadamente 20.590.308 possíveis clientes, e no mesmo ano tivemos a abertura de 3.868.687 novas empresas, então o potencial de mercado é na casa dos milhões de clientes.
Fontes:
https://www.gov.br/empresas-e-negocios/pt-br/mapa-de-empresas/boletins/mapa-de-empresas-boletim-3o-quadrimestre-2023.pdf
https://exame.com/pme/as-pmes-representam-27-do-pib-confira-dicas-para-ter-sucesso-na-sua_red-01/


## Banco de dados

### Porque utilizar?
#### 1. Escalabilidade
Considerando o mercado potencial citado (mais de 20 milhões de possíveis clientes):

- **Crescimento Horizontal**: NoSQL permite adicionar mais servidores facilmente para lidar com o aumento de demanda
- **Performance em Leitura**: Otimizado para consultas frequentes de documentos completos
- **Distribuição Geográfica**: Facilita a replicação de dados para atender diferentes regiões

#### 2. Performance
O caso de uso da CIDA exige:

- **Processamento Assíncrono**: Análises podem ser executadas em background
- **Alta Disponibilidade**: Sistema precisa estar sempre disponível para processar novos documentos

### Análise do Modelo de Dados

#### 1. Estrutura Principal

##### User Collection
```javascript
{
    nome: String,
    tipoDoc: "CPF" | "CNPJ",
    numDoc: String,
    telefone: String,
    criadoEm: DateTime,
    status: "ativo" | "inativo",
    auth: {
        email: String,
        hashSenha: String
    }
}
```

##### Insight Collection
```javascript
{
    usuario: ObjectId,
    dataCriacao: DateTime,
    descricao: String,
    resumo: {
        dataCriacao: DateTime,
        descricao: String
    },
    arquivos: [{
        nome: String,
        extensao: String,
        tamanho: Number,
        dataUpload: DateTime,
        url: String
    }]
}
```

#### 2. Relacionamentos e Justificativas

##### Documento Embedado vs. Referências
- O `resumo` está embedado no `insight` porque:
  - É uma relação 1:1
  - Sempre será acessado junto com o insight
  - Tem um tamanho previsível e limitado

- Os `arquivos` estão em um array embedado porque:
  - São fortemente acoplados ao insight
  - Quantidade limitada por análise
  - Necessário para manter rastreabilidade

- O `usuario` é referenciado por ID porque:
  - Permite atualizações independentes dos dados do usuário
  - Reduz duplicação de dados
  - Usuário pode ter múltiplos insights

#### 3. Adequação ao Projeto

##### Suporte aos Requisitos do Negócio
1. **Processamento de Dados Brutos**
   - O modelo `arquivos` permite armazenar metadados de qualquer tipo de arquivo
   - URLs permitem acesso aos arquivos originais armazenados em sistema de arquivos distribuído

2. **Geração de Insights**
   - Estrutura flexível do `insight` permite armazenar análises de diferentes naturezas
   - `resumo` fornece visão rápida sem necessidade de processar todo o conteúdo

3. **Rastreabilidade**
   - Todos os documentos possuem timestamps
   - Relacionamento claro entre usuários, insights e arquivos
   - Histórico de uploads e análises facilmente acessível

##### Vantagens do Modelo
1. **Escalabilidade**
   - Estrutura permite sharding por usuário ou por data
   - Documentos autocontidos facilitam distribuição

2. **Performance**
   - Consultas comuns (listar insights por usuário, buscar arquivos de um insight) são otimizadas
   - Índices podem ser criados em campos críticos (dataCriacao, usuario)

3. **Manutenibilidade**
   - Estrutura clara e bem definida
   - Fácil evolução do schema sem quebrar compatibilidade
### Segurança

A segurança dos dados é um aspecto crítico para a CIDA, considerando o volume e a sensibilidade das informações processadas. O MongoDB precisa ser configurado e mantido com várias camadas de segurança para garantir a proteção adequada dos dados dos clientes.

#### Aspectos Fundamentais de Segurança:

1. **Controle de Acesso**
    - Gerenciamento granular de permissões por usuário e função
    - Segregação de dados entre diferentes organizações
    - Políticas de acesso baseadas em contexto
    - Monitoramento e registro de atividades
2. **Proteção dos Dados**
    - Criptografia em diferentes níveis
    - Proteção contra vazamentos
    - Backups seguros e regulares
    - Políticas de retenção de dados
3. **Compliance e Regulamentações**
    - Adequação à LGPD/GDPR
    - Trilhas de auditoria
    - Documentação de processos
    - Políticas de privacidade
4. **Segurança em Camadas**
    - Segurança na rede
    - Segurança no armazenamento
    - Segurança na aplicação
    - Segurança nos processos

#### Considerações Específicas para CIDA:

1. **Proteção de Documentos Sensíveis**
    - Dados estratégicos das empresas
    - Informações financeiras
    - Documentos internos
    - Análises competitivas
2. **Isolamento de Dados**
    - Separação entre clientes
    - Ambientes segregados
    - Controle de acesso contextual
    - Proteção contra vazamentos entre organizações
3. **Monitoramento e Detecção**
    - Alertas de segurança
    - Detecção de anomalias
    - Prevenção de ataques
    - Resposta a incidentes
4. **Governança de Dados**
    - Políticas de uso
    - Classificação de dados
    - Ciclo de vida da informação
    - Gestão de riscos

#### Benefícios de uma Estratégia Robusta de Segurança:

1. **Confiança do Cliente**
    - Proteção garantida dos dados
    - Transparência nos processos
    - Conformidade com regulamentações
    - Gestão responsável de informações
2. **Redução de Riscos**
    - Prevenção de vazamentos
    - Proteção contra ataques
    - Continuidade do negócio
    - Preservação da reputação
3. **Escalabilidade Segura**
    - Crescimento controlado
    - Adição segura de recursos
    - Integração protegida
    - Evolução sustentável
### Integração

A capacidade de integração é fundamental para o sucesso da CIDA, pois precisamos interagir com diversos sistemas e formatos de dados. O MongoDB oferece flexibilidade e ferramentas que facilitam esta integração.

#### Cenários de Integração:

1. **Entrada de Dados**
   - Sistemas legados
   - Diferentes formatos de arquivos
   - APIs externas
   - Ferramentas de BI existentes

2. **Saída de Dados**
   - Exportação de relatórios
   - Integração com dashboards
   - APIs para consumo externo
   - Sistemas de notificação

3. **Processamento**
   - Análise em tempo real
   - Processamento em lote
   - Transformação de dados
   - Sincronização entre sistemas

#### Benefícios da Abordagem MongoDB:

1. **Flexibilidade**
   - Adaptação a diferentes formatos
   - Evolução do schema
   - Múltiplos tipos de dados
   - Escalabilidade conforme necessidade

2. **Performance**
   - Processamento distribuído
   - Consultas otimizadas
   - Cache eficiente
   - Balanceamento de carga

3. **Manutenção**
   - Monitoramento simplificado
   - Backup e recuperação
   - Versionamento de dados
   - Gestão de recursos

A combinação de segurança robusta e capacidades de integração flexíveis do MongoDB permite que a CIDA:
- Mantenha a confiança dos clientes
- Expanda funcionalidades conforme necessário
- Adapte-se a diferentes contextos empresariais
- Evolua com as necessidades do mercado

Esta infraestrutura fornece uma base sólida para o crescimento da plataforma, permitindo que nos concentremos em entregar valor através da análise de dados enquanto mantemos a segurança e confiabilidade que nossos clientes esperam.
