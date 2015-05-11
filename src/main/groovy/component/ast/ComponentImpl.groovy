package component.ast

import org.codehaus.groovy.ast.*
import org.codehaus.groovy.ast.builder.AstBuilder
import org.codehaus.groovy.ast.expr.*
import org.codehaus.groovy.ast.stmt.BlockStatement
import org.codehaus.groovy.ast.stmt.ExpressionStatement
import org.codehaus.groovy.control.CompilePhase
import org.codehaus.groovy.control.SourceUnit
import org.codehaus.groovy.transform.ASTTransformation
import org.codehaus.groovy.transform.GroovyASTTransformation
import org.grooscript.builder.HtmlBuilder
import org.grooscript.jquery.GQuery
import org.grooscript.jquery.GQueryImpl

import java.lang.reflect.Modifier

@GroovyASTTransformation(phase=CompilePhase.SEMANTIC_ANALYSIS)
public class ComponentImpl implements ASTTransformation {

    public void visit(ASTNode[] nodes, SourceUnit sourceUnit) {
        //Start
        if (!nodes[0] instanceof AnnotationNode || !nodes[1] instanceof ClassNode) {
            return
        }

        ClassNode classNode = (ClassNode) nodes[1]
        ClassNode gQueryImpl = new ClassNode(GQueryImpl)

        addStartMethod(classNode)

        classNode.properties.each { propertyNode ->
            if (propertyNode.type.name == 'java.lang.Integer') {
                addSetMethod(classNode, propertyNode.name)
            }
        }

        classNode.addProperty('gQuery', Modifier.PUBLIC , gQueryImpl,
                new ConstructorCallExpression(gQueryImpl, ArgumentListExpression.EMPTY_ARGUMENTS), null, null)
        classNode.addProperty('selector', Modifier.PUBLIC , ClassHelper.STRING_TYPE, null, null, null)

        manageRenderMethod(classNode)
    }

    private addSetMethod(ClassNode classNode, String nameProperty) {
        def params = new Parameter[1]
        params[0] = new Parameter(ClassHelper.Integer_TYPE, nameProperty)
        classNode.addMethod("set${nameProperty.capitalize()}".toString(), Modifier.PUBLIC, null, params,
                ClassNode.EMPTY_ARRAY, new AstBuilder().buildFromString("""
            this.${nameProperty} = ${nameProperty}
            this.render()
        """)[0])
    }

    private addStartMethod(ClassNode classNode) {
        def params = new Parameter[1]
        params[0] = new Parameter(ClassHelper.STRING_TYPE, 'selector')
        classNode.addMethod('start', Modifier.PUBLIC, null, params,
                ClassNode.EMPTY_ARRAY, new AstBuilder().buildFromCode {
            this.selector = selector
            this.init()
            this.render()
        }[0])
    }

    private manageRenderMethod(ClassNode classNode) {
        MethodNode renderMethod = classNode.methods.find { it.name == 'render'}
        if (!renderMethod) {
            classNode.addMethod('render', Modifier.PUBLIC, null, Parameter.EMPTY_ARRAY,
                    ClassNode.EMPTY_ARRAY, new AstBuilder().buildFromCode {
                //Nothing to do
            }[0])
        } else {
            BlockStatement actualCode = (BlockStatement)renderMethod.code

            VariableScope variableScope = actualCode.getVariableScope()
            VariableScope blockScope = variableScope.copy()

            ClosureExpression closure = new ClosureExpression(Parameter.EMPTY_ARRAY, actualCode)
            VariableScope closureScope = variableScope.copy()
            closure.setVariableScope(closureScope)

            renderMethod.setCode(renderBlockCode(blockScope, closure, classNode))
        }
    }

    private BlockStatement renderBlockCode(VariableScope blockScope, ClosureExpression closure, ClassNode classNode) {
        BlockStatement result = new BlockStatement([
            new ExpressionStatement(
                new MethodCallExpression(
                    new MethodCallExpression(
                        new PropertyExpression(
                                new VariableExpression('this', ClassHelper.OBJECT_TYPE),
                                'gQuery'
                        ),
                        'call',
                        new ArgumentListExpression([
                                new VariableExpression('selector', ClassHelper.STRING_TYPE)
                        ])
                    ),
                    'html',
                    new ArgumentListExpression([
                        new MethodCallExpression(
                                new ClassExpression(new ClassNode(HtmlBuilder)),
                                'build' ,
                                new ArgumentListExpression([
                                        closure
                                ])
                        )
                    ])
                )
            )
        ], blockScope)
        addAfterRenderMethod(result, classNode)
        return result
    }

    private addAfterRenderMethod(BlockStatement blockStatement, ClassNode classNode) {
        if (classNode.methods.find { it.name == 'afterRender'}) {
            blockStatement.addStatement(new ExpressionStatement(new MethodCallExpression(
                    new VariableExpression('this', ClassHelper.OBJECT_TYPE),
                    'afterRender',
                    new ArgumentListExpression([
                            new PropertyExpression(
                                    new VariableExpression('this', ClassHelper.OBJECT_TYPE),
                                    'gQuery'
                            )
                    ])
            )))
        }
    }
}