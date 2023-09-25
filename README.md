# This synthesis fails!

Synthesize as
```
NODE_OPTIONS="--max-old-space-size=15000" cdk synth
```

To observe an error like

```
/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/private/tree-metadata.js:1
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TreeMetadata=void 0;const fs=require("fs"),path=require("path"),constructs_1=require("constructs"),runtime_info_1=require("./runtime-info"),cloud_assembly_schema_1=require("../../../cloud-assembly-schema"),annotations_1=require("../annotations"),stack_1=require("../stack"),tree_1=require("../tree"),FILE_PATH="tree.json";class TreeMetadata extends constructs_1.Construct{constructor(scope){super(scope,"Tree")}_synthesizeTree(session){const lookup={},visit=construct=>{const childrenMap=construct.node.children.map(c=>{try{return visit(c)}catch(e){annotations_1.Annotations.of(this).addWarningV2(`@aws-cdk/core:failedToRenderTreeMetadata-${c.node.id}`,`Failed to render tree metadata for node [${c.node.id}]. Reason: ${e}`);return}}).filter(child=>child!==void 0).reduce((map,child)=>Object.assign(map,{[child.id]:child}),{}),parent=construct.node.scope,node={id:construct.node.id||"App",path:construct.node.path,parent:parent&&parent.node.path?{id:parent.node.id,path:parent.node.path,constructInfo:(0,runtime_info_1.constructInfoFromConstruct)(parent)}:void 0,children:Object.keys(childrenMap).length===0?void 0:childrenMap,attributes:this.synthAttributes(construct),constructInfo:(0,runtime_info_1.constructInfoFromConstruct)(construct)};return lookup[node.path]=node,node},tree={version:"tree-0.1",tree:visit(this.node.root)};this._tree=lookup;const builder=session.assembly;fs.writeFileSync(path.join(builder.outdir,FILE_PATH),JSON.stringify(tree,(key,value)=>{if(key!=="parent")return value},2),{encoding:"utf-8"}),builder.addArtifact("Tree",{type:cloud_assembly_schema_1.ArtifactType.CDK_TREE,properties:{file:FILE_PATH}})}getNodeWithParents(node){if(!this._tree)throw new Error(`attempting to get node branch for ${node.path}, but the tree has not been created yet!`);let tree=node;return node.parent&&(tree={...node,parent:this.getNodeWithParents(this._tree[node.parent.path])}),tree}renderTreeWithChildren(node){function renderTreeWithSingleChild(currentNode2,currentNodeChild){return currentNode2.children={[currentNodeChild.id]:currentNodeChild},currentNode2.parent&&(currentNode2.parent=renderTreeWithSingleChild(currentNode2.parent,currentNode2)),currentNode2}let root=node.parent?renderTreeWithSingleChild(node.parent,node):node;do root.parent&&(root=root.parent);while(root.parent);return root}_getNodeBranch(constructPath){if(!this._tree)throw new Error(`attempting to get node branch for ${constructPath}, but the tree has not been created yet!`);const tree=this._tree[constructPath],treeWithParents=this.getNodeWithParents(tree);return this.renderTreeWithChildren(treeWithParents)}synthAttributes(construct){function canInspect(inspectable){return inspectable.inspect!==void 0}const inspector=new tree_1.TreeInspector;if(canInspect(construct))return construct.inspect(inspector),stack_1.Stack.of(construct).resolve(inspector.attributes)}}exports.TreeMetadata=TreeMetadata;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ^
RangeError: Invalid string length
    at JSON.stringify (<anonymous>)
    at TreeMetadata._synthesizeTree (/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/private/tree-metadata.js:1:1515)
    at /Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/private/synthesis.js:2:3487
    at visit (/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/private/synthesis.js:4:368)
    at visit (/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/private/synthesis.js:4:330)
    at synthesizeTree (/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/private/synthesis.js:2:3251)
    at synthesize (/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/private/synthesis.js:1:1083)
    at App.synth (/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/stage.js:1:2052)
    at process.<anonymous> (/Users/moffattb/cdk-tree-limit/node_modules/aws-cdk-lib/core/lib/app.js:1:1448)
    at Object.onceWrapper (node:events:628:26)
```

Related to https://github.com/aws/aws-cdk/issues/27261

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
